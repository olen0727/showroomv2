import type { Metadata } from 'next'
import './globals.css'

const isDev = process.env.NODE_ENV === 'development'

export const metadata: Metadata = {
  metadataBase: new URL('https://olean.com.tw'),
  title: 'Portfolio | Full Stack Developer',
  description: 'Creative portfolio — building immersive web experiences with Three.js, GSAP & Next.js',
  icons: {
    icon: isDev ? '/favicon-dev.svg' : '/favicon-prod.svg',
  },
  openGraph: {
    images: [
      {
        url: 'https://portfolio.olean.com.tw/cache.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://portfolio.olean.com.tw/cache.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
