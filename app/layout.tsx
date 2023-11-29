import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Nav } from '@/components/Nav'

const url = process.env.NEXT_PUBLIC_PROD_URL || 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(url),
  title: 'Litter',
  description: 'Your purr-fect source of daily, pawsome mews',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='bg-foreground text-background'>
        <Nav />
        <main className='flex flex-col items-center'>
          {children}
        </main>
      </body>
    </html>
  )
}
