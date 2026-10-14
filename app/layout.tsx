import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'रक्तदान शिविर | Blood Donation Camp Registration',
  description: 'Register your interest in our blood donation camp on 18 October 2026 at Shri Jai Narayan Vyas Vidyalaya, Jadav Mohalla, Jodhpur.',
  keywords: ['blood donation', 'रक्तदान', 'blood camp', 'jodhpur', 'रक्तदान शिविर'],
  authors: [{ name: 'Blood Donation Camp Organizers' }],
  openGraph: {
    type: 'website',
    title: 'रक्तदान शिविर | Blood Donation Camp Registration',
    description: 'Register for blood donation camp on 18 October 2026 at Shri Jai Narayan Vyas Vidyalaya, Jodhpur',
    locale: 'hi_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'रक्तदान शिविर | Blood Donation Camp',
    description: 'Register for blood donation camp on 18 October 2026, Jodhpur',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hi" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
