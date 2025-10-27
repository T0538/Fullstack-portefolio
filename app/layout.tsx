import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import JsonLd from '@/components/JsonLd'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio Full-Stack | Développeur Web - Abidjan, Côte d\'Ivoire',
  description: 'Développeur web full-stack passionné basé à Abidjan. Spécialisé en React, Next.js, TypeScript et Node.js. Création d\'applications web modernes et performantes.',
  keywords: 'développeur web, full-stack, React, Next.js, TypeScript, Abidjan, Côte d\'Ivoire, développeur Abidjan, portfolio développeur',
  authors: [{ name: 'Portfolio Developer' }],
  creator: 'Portfolio Developer',
  publisher: 'Portfolio Developer',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://votre-site.netlify.app',
    title: 'Portfolio Full-Stack | Développeur Web',
    description: 'Développeur web full-stack passionné basé à Abidjan, Côte d\'Ivoire. Création d\'applications web modernes.',
    siteName: 'Portfolio Developer',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio Developer - Abidjan'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Full-Stack | Développeur Web',
    description: 'Développeur web full-stack basé à Abidjan, Côte d\'Ivoire',
    images: ['/og-image.png']
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/manifest.json'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <JsonLd />
        <link rel="canonical" href="https://votre-site.netlify.app" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
