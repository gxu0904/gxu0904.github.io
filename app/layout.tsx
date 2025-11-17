import type { Metadata, Viewport } from "next";
import "./globals.css";
import { playfair, inter, plex } from "./fonts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CursorProvider from "./components/CursorProvider";
import ScrollProgress from "./components/ScrollProgress";
import { personSchema, websiteSchema } from "./seo.config";

export const metadata: Metadata = {
  title: "Grace Xu — Designing logic, systems, and stories",
  description:
    "Engineer. Researcher. Builder. Creating systems that solve real problems—from atomic-scale material science to large-scale social impact initiatives.",
  keywords: [
    "Grace Xu",
    "engineer",
    "researcher",
    "full-stack developer",
    "machine learning",
    "social impact",
  ],
  authors: [{ name: "Grace Xu" }],
  openGraph: {
    title: "Grace Xu — Designing logic, systems, and stories",
    description:
      "Engineer. Researcher. Builder. Creating systems that solve real problems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grace Xu — Designing logic, systems, and stories",
    description:
      "Engineer. Researcher. Builder. Creating systems that solve real problems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A1929",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${plex.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-[var(--bg)] text-[var(--fg)] antialiased">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <CursorProvider />
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

