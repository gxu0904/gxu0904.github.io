// SEO configuration for reference (metadata is handled in layout.tsx)
export const seoConfig = {
  title: "Grace Xu — Designing logic, systems, and stories",
  description:
    "Engineer. Researcher. Builder. Creating systems that solve real problems—from atomic-scale material science to large-scale social impact initiatives.",
  canonical: "https://grace-xu.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://grace-xu.com",
    siteName: "Grace Xu",
    title: "Grace Xu — Designing logic, systems, and stories",
    description:
      "Engineer. Researcher. Builder. Creating systems that solve real problems.",
    images: [
      {
        url: "https://grace-xu.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Grace Xu — Systems in Motion",
      },
    ],
  },
  twitter: {
    handle: "@gracexu",
    site: "@gracexu",
    cardType: "summary_large_image",
  },
};

// Structured data for Person schema
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Grace Xu",
  jobTitle: "Engineer, Researcher, Builder",
  description:
    "Creating systems that solve real problems—from atomic-scale material science to large-scale social impact initiatives.",
  url: "https://grace-xu.com",
  sameAs: [
    "https://github.com/gracexu",
    "https://linkedin.com/in/gracexu",
  ],
};

// Structured data for WebSite schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Grace Xu",
  url: "https://grace-xu.com",
  description:
    "Engineer. Researcher. Builder. Creating systems that solve real problems.",
};

