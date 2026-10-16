import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

import { isSearchIndexingBlocked } from "@/lib/settings";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const isBlocked = await isSearchIndexingBlocked();

  return {
    title: "RIOFLIX - Kho Phim Giải Trí Đỉnh Cao | Xem Phim Online Miễn Phí",
    description: "Xem RIOFLIX chất lượng cao, phim 4K, Vietsub, thuyết minh. Kho phim lẻ, phim bộ, anime mới nhất. Trải nghiệm không quảng cáo!",
    icons: {
      icon: "/favicon.ico",
    },
    ...(isBlocked
      ? {
          robots: {
            index: false,
            follow: false,
            nocache: true,
            googleBot: {
              index: false,
              follow: false,
              noimageindex: true,
              "max-video-preview": -1,
              "max-image-preview": "none",
              "max-snippet": -1,
            },
          },
        }
      : {
          robots: {
            index: true,
            follow: true,
          },
        }),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${poppins.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-white font-sans flex flex-col selection:bg-green-500 selection:text-black">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
