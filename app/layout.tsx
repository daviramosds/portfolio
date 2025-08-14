import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle, LanguageProvider } from "@/components/language-toggle"

const SITE_URL = "https://davirds.dev"
const OG_IMAGE = "/og-image.jpg" // garanta esse arquivo em /public

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Davi Ramos",
  title: {
    default: "Davi Ramos — Development • Automation • DevOps",
    template: "%s | Davi Ramos",
  },
  description:
    "I craft digital solutions that streamline workflows and bring ideas to life. Specializing in modern web development, automation, and seamless user experiences.",
  keywords: [
    "Davi Ramos",
    "Developer",
    "DevOps",
    "Automation",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "CI/CD",
  ],
  authors: [{ name: "Davi Ramos", url: SITE_URL }],
  creator: "Davi Ramos",
  publisher: "Davi Ramos",
  category: "Technology",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/", // en e pt apontam para a mesma URL
      "pt-BR": "/", // tradução automática
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL + "/",
    title: "Davi Ramos — Development • Automation • DevOps",
    siteName: "Davi Ramos",
    description:
      "Modern web development, automation, and DevOps to turn ideas into reliable products.",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Davi Ramos — Portfolio",
      },
    ],
  },
  // sem Twitter (conforme pedido)
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
    icon: [{ url: "/favicon.png", sizes: "any" }],
    apple: [{ url: "/favicon.png" }], // usar favicon.png também como ícone da Apple
    shortcut: [{ url: "/favicon.png" }],
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href={OG_IMAGE} as="image" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>

        {/* Structured Data (JSON-LD) — Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Davi Ramos",
              url: SITE_URL,
              jobTitle: "Development, Automation & DevOps Specialist",
              worksFor: { "@type": "Organization", name: "Independent" },
              sameAs: [
                "https://github.com/davirds",
                "https://www.linkedin.com/in/davirds/",
              ],
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ThemeToggle />
            <LanguageToggle />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
