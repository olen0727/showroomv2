import type { Metadata } from 'next'
import './globals.css'

const isDev = process.env.NODE_ENV === 'development'

export const metadata: Metadata = {
  title: 'Portfolio | Full Stack Developer',
  description: 'Creative portfolio — building immersive web experiences with Three.js, GSAP & Next.js',
  icons: {
    icon: isDev ? '/favicon-dev.svg' : '/favicon-prod.svg',
  },
  openGraph: {
    images: ['/cache.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/cache.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
