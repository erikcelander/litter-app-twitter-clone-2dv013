//import { ModeToggle } from './mode-toggle'
import Image from 'next/image'
import litter from '@/public/litter.svg'
import { Button } from './ui/button'

export function Nav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={` flex justify-between items-center h-16 px-4 border-b border-b-background/10`} {...props}>
      <div className='flex-initial pr-1'>
        <div className='flex flex-row text-center'>
          <Image src={litter} alt='Litter Logo' width={35} height={35} />
          <h2 className='text-center text-3xl pl-4 items-center text-primary pt-1'>litter</h2>
        </div>
      </div>

      <div className='flex-initial pl-40'>
        <Button  className='text-foreground hover:bg-primary/70' >Join the pack</Button>
        {/* <ModeToggle /> */}
      </div>
    </div>
  )
}
