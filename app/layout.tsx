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
      <body className='bg-foreground text-background  relative'>
      <Nav className='' />

        <div className='flex flex-col flex-grow justify-center items-center '>


          <div className='bg-[#1a1a1a] ' style={{ width: '600px', minHeight: 'calc(100vh - 64px)' }}>

            <main className='flex flex-col items-center justify-center ml-auto mr-auto' >
              {children}
            </main>


          </div>
        </div>
      </body>
    </html>
  )
}