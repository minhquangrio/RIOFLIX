import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function resolveUrl(baseUrl: string, relativeUrl: string): string {
  try {
    return new URL(relativeUrl, baseUrl).href;
  } catch {
    return relativeUrl;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing "url" parameter', { status: 400 });
  }

  try {
    let origin = 'https://phimapi.com';
    try {
      origin = new URL(targetUrl).origin;
    } catch {}

    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Referer': `${origin}/`,
      'Origin': origin,
      'Accept': '*/*',
    };

    // Forward range header if present (for video chunk seeking)
    const range = request.headers.get('range');
    if (range) {
      headers['Range'] = range;
    }

    const response = await fetch(targetUrl, {
      headers,
      cache: 'no-store',
    });

    if (!response.ok && response.status !== 206) {
      let errorBody = "";
      try {
        errorBody = await response.text();
      } catch {}

      const isGeoBlocked = errorBody.includes("Vui lòng sử dụng mạng trong nước") || 
                           errorBody.includes("DEBUG: IP");

      return new NextResponse(
        isGeoBlocked 
          ? "Geo-blocked: Vui lòng tắt VPN/Cloudflare WARP hoặc sử dụng mạng trong nước để truy cập video này."
          : `Target responded with status ${response.status}`, 
        {
          status: response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD',
            'X-Stream-Error': isGeoBlocked ? 'geo_blocked' : 'target_error',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        }
      );
    }

    const contentType = response.headers.get('content-type') || '';
    const isM3u8 = targetUrl.includes('.m3u8') || 
                   contentType.includes('mpegurl') || 
                   contentType.includes('application/x-mpegURL') ||
                   contentType.includes('application/vnd.apple.mpegurl');

    if (isM3u8) {
      const text = await response.text();
      const lines = text.split(/\r?\n/);
      
      const rewrittenLines = lines.map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return line;

        // Rewrite URI attributes in tags like #EXT-X-KEY or #EXT-X-MEDIA
        if (trimmed.startsWith('#')) {
          if (trimmed.includes('URI=')) {
            return line.replace(/URI=["']([^"']+)["']/g, (_, uri) => {
              const resolved = resolveUrl(targetUrl, uri);
              return `URI="/api/stream?url=${encodeURIComponent(resolved)}"`;
            });
          }
          return line;
        }

        // Rewrite segment or sub-playlist URL
        const resolved = resolveUrl(targetUrl, trimmed);
        return `/api/stream?url=${encodeURIComponent(resolved)}`;
      });

      return new NextResponse(rewrittenLines.join('\n'), {
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // Binary stream (e.g. .ts chunk, .key, .mp4, audio)
    const responseHeaders: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Cache-Control': 'public, max-age=3600',
    };

    if (contentType) {
      responseHeaders['Content-Type'] = contentType;
    } else if (targetUrl.includes('.ts')) {
      responseHeaders['Content-Type'] = 'video/mp2t';
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength) responseHeaders['Content-Length'] = contentLength;

    const contentRange = response.headers.get('content-range');
    if (contentRange) responseHeaders['Content-Range'] = contentRange;

    const acceptRanges = response.headers.get('accept-ranges');
    if (acceptRanges) responseHeaders['Accept-Ranges'] = acceptRanges;

    return new NextResponse(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error('Proxy stream error:', error?.message || error);
    return new NextResponse('Proxy stream error: ' + (error?.message || 'Remote server unreachable'), {
      status: 502,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}
