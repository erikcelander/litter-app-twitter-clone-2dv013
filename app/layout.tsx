import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Nav } from '@/components/Nav'

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : 'http://localhost:3000'

export const metadata = {
 // metadataBase: new URL(defaultUrl),
  title: 'Litter',
  description: 'Your purr-fect source of daily, pawsome mews'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-foreground text-background">
        <main className="">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}
