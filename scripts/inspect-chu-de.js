const fs = require('fs');

const html = fs.readFileSync('./docs/research/chu-de.html', 'utf8');

// Check for script tags, hydration data, or body elements
const scriptTags = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log(`Found ${scriptTags.length} script tags`);

for (const script of scriptTags) {
  if (script.includes('__NEXT_DATA__') || script.includes('buildId') || script.includes('pageProps') || script.includes('props')) {
    console.log('Script preview:', script.slice(0, 300));
  }
}

// Find all links
const links = [];
const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/g;
let match;
while ((match = linkRegex.exec(html)) !== null) {
  links.push({ href: match[1], text: match[2].replace(/<[^>]+>/g, '').trim() });
}

console.log('Total links found:', links.length);
console.log('Sample links:', links.slice(0, 30));
