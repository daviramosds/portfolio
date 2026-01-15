import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "@/components/language-toggle"
import { ConditionalToggles } from "@/components/conditional-toggles"

// CORRIGIDO: URL completa
const SITE_URL = "https://davirds.dev"
const OG_IMAGE = "/og-image.jpg"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Davi Ramos",
  title: {
    default: "Davi Ramos de Sousa | Software Engineer | Backend & Automation",
    template: "%s | Davi Ramos",
  },
  description:
    "Davi Ramos de Sousa - Software Engineer specializing in Backend Engineering, SaaS Development, APIs & Integrations, and Automation. Expert in TypeScript, Node.js, NestJS, React, PostgreSQL, Docker, and modern cloud infrastructure.",
  keywords: [
    "Davi Ramos",
    "Davi Ramos de Sousa",
    "Davi Sousa",
    "Software Engineer",
    "Backend Engineer",
    "Backend Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "NestJS Developer",
    "SaaS Development",
    "Backend Engineering",
    "APIs & Integrations",
    "REST APIs",
    "Microservices",
    "Automation",
    "Process Automation",
    "Web Development",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "Database Design",
    "SQL",
    "Docker",
    "Kubernetes",
    "DevOps",
    "CI/CD",
    "AWS",
    "Google Cloud",
    "Python",
    "n8n",
    "Make",
    "Workflow Automation",
    "Backend Systems",
    "Scalable Applications",
    "System Architecture",
    "API Development",
    "Backend Architecture",
    "Software Development",
    "Tech Lead",
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
      "en-US": "/",
      "pt-BR": "/",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL + "/",
    title: "Davi Ramos de Sousa — Software Engineer | Backend & Automation",
    siteName: "Davi Ramos - Software Engineer Portfolio",
    description: "Backend Engineer and SaaS Developer specializing in TypeScript, Node.js, NestJS, React, PostgreSQL, Docker, and cloud infrastructure. Building scalable backend systems, APIs, and automation solutions.",
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
    apple: [{ url: "/favicon.png" }],
    shortcut: [{ url: "/favicon.png" }],
  },
  manifest: "/site.webmanifest",
  // A CHAVE 'themeColor' FOI MOVIDA DAQUI PARA 'viewport' ABAIXO
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // CORRIGIDO: Chave 'themeColor' movida para cá e valores preenchidos (baseado no globals.css)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(0 0% 100%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(0 0% 9%)" },
  ],
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
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              // CORRIGIDO: URL completa
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Davi Ramos de Sousa",
              alternateName: ["Davi Ramos", "Davi Sousa"],
              url: SITE_URL,
              jobTitle: "Software Engineer | Backend & Automation Specialist",
              description: "Backend Engineer specializing in SaaS development, APIs & integrations, and process automation using TypeScript, Node.js, NestJS, React, and PostgreSQL",
              knowsAbout: [
                "Backend Engineering",
                "Software Engineering",
                "SaaS Development",
                "API Development",
                "TypeScript",
                "Node.js",
                "NestJS",
                "React",
                "Next.js",
                "PostgreSQL",
                "Docker",
                "Microservices",
                "REST APIs",
                "Process Automation",
                "DevOps",
                "CI/CD",
                "AWS",
                "Google Cloud",
                "Python",
                "System Architecture",
                "Database Design",
              ],
              worksFor: { "@type": "Organization", name: "Freelance" },
              sameAs: [
                "https://github.com/daviramosds",
                "https://www.linkedin.com/in/davirds/",
                "mailto:davirds.dev@gmail.com",
              ],
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ConditionalToggles />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}