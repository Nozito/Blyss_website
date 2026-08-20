import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Blyss — Beauté. Business. Sérénité.",
    template: "%s",
  },
  description:
    "Blyss réunit clientes et professionnel·les de la beauté dans une seule application : réservation simple pour les clientes, agenda et paiements pour les pros.",
  metadataBase: new URL("https://blyssapp.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Blyss — Beauté. Business. Sérénité.",
    description:
      "Trouve des soins près de chez toi ou gère ton activité depuis une seule application.",
    url: "/",
    siteName: "Blyss",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blyss — Beauté. Business. Sérénité.",
    description:
      "Trouve des soins près de chez toi ou gère ton activité depuis une seule application.",
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Blyss",
  url: "https://blyssapp.fr",
  logo: "https://blyssapp.fr/opengraph-image",
  sameAs: [
    "https://www.instagram.com/blyss_app/",
    "https://www.tiktok.com/@blyss_app",
    "https://www.linkedin.com/company/blysapp/",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${jakartaSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
