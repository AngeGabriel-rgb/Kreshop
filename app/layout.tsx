import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kre Shop',
  description: 'KRE SHOP - Your one-stop shop for all things KRE',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
