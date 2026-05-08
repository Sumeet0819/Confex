import { Home, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-40 w-full bg-[#1c1f2e] px-6 py-4 lg:px-10'>
      <Link href="/" className='flex items-center gap-1'>
        <Video className='text-[#0E78F9]' size={32} />
        <p className='text-[26px] font-extrabold text-white hidden sm:block'>Confex</p>
      </Link>


      <div className='flex-between gap-5'>
        <UserButton />
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
