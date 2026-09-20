import type { Metadata } from "next";
import "@fontsource-variable/sora";
import "./globals.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "Blue Premoldados | Construções e Pré-Moldados na PB e RN",
  description:
    "Construção de galpões, prédios e casas, além de pilares, tesouras, contraventamentos e pisos intertravados na Paraíba e no Rio Grande do Norte.",
  keywords: [
    "Pré-moldados na Paraíba",
    "Pré-moldados no Rio Grande do Norte",
    "Construção de galpões na Paraíba",
    "Galpões pré-moldados no RN",
    "Pilares pré-moldados",
    "Tesouras de concreto",
    "Pisos intertravados",
    "Estruturas pré-moldadas",
  ],
  openGraph: {
    title: "Blue Premoldados | Construções e Pré-Moldados na PB e RN",
    description:
      "Soluções pré-moldadas para projetos residenciais, comerciais e industriais na Paraíba e no Rio Grande do Norte.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/images/hero-structure.webp", width: 1600, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Premoldados",
    description: "Construções e soluções pré-moldadas na PB e RN.",
    images: ["/images/hero-structure.webp"],
  },
  alternates: { canonical: "/" },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  legalName: siteConfig.name,
  taxID: siteConfig.cnpj,
  description:
    "Construções e soluções pré-moldadas para projetos residenciais, comerciais e industriais.",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Paraíba" },
    { "@type": "AdministrativeArea", name: "Rio Grande do Norte" },
  ],
  url: siteConfig.siteUrl,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
