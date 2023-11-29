import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Nav } from '@/components/Nav'

// const defaultUrl =
//   process.env.NODE_ENV === 'production'
//     ? `${process.env.PROD_URL}`
//     : 'http://localhost:3000'

const prod_URL = process.env.PROD_URL || ''

export const metadata = {
  metadataBase: new URL(prod_URL),
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
