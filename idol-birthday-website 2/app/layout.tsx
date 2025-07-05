import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Luna's Birthday Messages - Fan Celebration",
  description: "A heartwarming collection of birthday wishes for Luna from fans around the world",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  other: {
    "format-detection": "telephone=no",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; overflow-x: hidden; }
    `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
