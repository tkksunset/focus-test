import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE.title,
    title: SITE.title,
    description: SITE.description,
    url: "/",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fffaf0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* 日本語：Zen Maru Gothic / 数字・英字：Bricolage Grotesque（ルートレイアウトなので全ページに効きます） */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Zen+Maru+Gothic:wght@500;700;900&display=swap"
        />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
