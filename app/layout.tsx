import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ojash Osti - Software Engineer & Developer",
  description:
    "Portfolio of Ojash Osti, a passionate software engineering student specializing in modern web development and innovative solutions.",
  keywords: ["Ojash Osti", "Software Engineer", "Web Developer", "Portfolio", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Ojash Osti" }],
  creator: "Ojash Osti",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ojashosti.dev",
    title: "Ojash Osti - Software Engineer & Developer",
    description:
      "Portfolio of Ojash Osti, a passionate software engineering student specializing in modern web development and innovative solutions.",
    siteName: "Ojash Osti Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ojash Osti - Software Engineer & Developer",
    description:
      "Portfolio of Ojash Osti, a passionate software engineering student specializing in modern web development and innovative solutions.",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Search Console verification meta tag */}
        <meta name="google-site-verification" content="HlUZe9Yuqw3KlCuvybWVEGuPHy9PpzPpBg9-IzD5UFI" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
