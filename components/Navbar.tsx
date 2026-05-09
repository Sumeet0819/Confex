import { Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-7xl glassmorphism px-6 py-3 rounded-2xl border border-white/10 shadow-2xl'>
      <Link href="/" className='flex items-center gap-2'>
        <div className="bg-white/5 p-2 rounded-lg border border-white/10">
          <Video className='text-white' size={20} />
        </div>
        <p className='text-xl font-bold text-white hidden sm:block tracking-tight'>Confex</p>
      </Link>

      <div className='flex items-center gap-4'>
        <div className="border border-white/10 rounded-full p-0.5 hover:border-white/20 transition-colors">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: 'h-8 w-8'
              }
            }}
          />
        </div>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
