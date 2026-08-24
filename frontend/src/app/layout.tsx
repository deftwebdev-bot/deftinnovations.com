import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deftinnovations.com"),
  title: {
    default: "Deft Innovations — Creative Technology & Marketing Agency",
    template: "%s | Deft Innovations"
  },
  description: "Deft Innovations is a modern creative technology and marketing agency combining brand architecture, Next.js web engineering, performance paid acquisition, and technical SEO to build market-defining businesses.",
  keywords: ["Digital Marketing Agency", "Brand Identity", "Next.js Web Development", "Performance Marketing", "SEO Agency", "Creative Technology"],
  authors: [{ name: "Deft Innovations" }],
  creator: "Deft Innovations",
  openGraph: {
    title: "Deft Innovations — Creative Technology & Marketing Agency",
    description: "Building brands that move businesses forward. Strategy + Creativity + Technology + Performance.",
    url: "https://deftinnovations.com",
    siteName: "Deft Innovations",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deft Innovations — Creative Technology & Marketing Agency",
    description: "Building brands that move businesses forward.",
    creator: "@deftinnovations",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
