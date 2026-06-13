import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap } from 'lucide-react'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'

export default function Header() {
  return (
    <header className='fixed w-full top-0 left-0 z-50 h-16 border-b border-white/6 bg-white/7 backdrop-blur-md'>
      <nav className='mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6'>
        <Link href="/">
            <Image src={"/logo.png"} alt="forge logo" width={100} height={100} className="h-9 w-auto rounded-md">
            </Image>
        </Link>
        <div className='flex items-center gap-5'>
            <Show when="signed-out">
              <SignInButton mode='modal'>
                <Button variant={'ghost'} size="sm" className={"text-white/40"}>sign in</Button>
              </SignInButton>
              <SignUpButton mode='modal'>
                <Button size="sm" className={"h-8 rounded-full font-semibold active:scale-95 px-4 pt-0.5"}>
                    Get Started <ArrowRight className='h-3 w-3 opacity-60'></ArrowRight>
                </Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
                <Link href={"/projects"}
                    className='text-[13px] font-medium text-white/40 transition-colors hover:text-white/80'
                >
                    Projects
                </Link>
                <span className='h-8 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-white/70'>
                    <Zap className='h-3 w-3 fill-white/70'/>
                    3 / 40 credits
                </span>

                <UserButton />
            </Show>
        </div>
      </nav>
    </header>
  )
}
