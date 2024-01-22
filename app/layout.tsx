import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Nav } from '@/components/nav'

// Use environment variable for the URL
const url = process.env.NEXT_PUBLIC_LITTER_URL || 'somethingwentwrong';

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
