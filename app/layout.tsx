import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Nav } from '@/components/Nav'

// const url = 'https://cscloud7-103.lnu.se'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_LITTER_URL || ''),
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
