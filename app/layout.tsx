import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Vanguard Meridian Partners",
    default: "Vanguard Meridian Partners | High-Consequence Systems Architecture & Advisory",
  },
  description: "Specialized systems architecture, digital resilience, and technology governance advisory for institutional leaders, market infrastructure, and regulated global enterprises.",
  openGraph: {
    title: "Vanguard Meridian Partners | Enterprise Systems Advisory",
    description: "Architectural integrity, regulatory resilience, and strategic systems engineering for high-consequence institutions.",
    url: "https://vanguardmeridian.example",
    siteName: "Vanguard Meridian Partners",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#C59B27] selection:text-[#0B1528]">
        {children}
      </body>
    </html>
  );
}
