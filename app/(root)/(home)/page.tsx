import MeetingTypeList from '@/components/MeetingTypeList'
import React from 'react'

const Home = () => {

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const date = new Date().toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section className='flex size-full flex-col gap-10 text-white xl:mt-10'>
      <div className='relative h-[300px] w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl'>
        {/* Abstract Dark Background */}
        <div className="absolute inset-0 bg-[#0d0d0d]">
          <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[80%] bg-white/[0.03] blur-[120px] rounded-full" />
          {/* Mesh Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className='relative z-10 flex h-full flex-col justify-between max-md:px-6 max-md:py-10 lg:p-12'>
          <div className="flex flex-col gap-2">
            <span className="w-fit px-4 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-white/60 tracking-[0.2em] uppercase">
              Live Dashboard
            </span>
            <h2 className='text-sm lg:text-base font-medium text-white/40'>Upcoming Meeting at : 11:30 PM</h2>
          </div>

          <div className='flex w-full flex-col gap-2'>
            <h1 className='text-6xl font-black lg:text-8xl tracking-tighter leading-none'>
              {time}
            </h1>
            <p className='text-lg font-semibold text-white/50 tracking-wide'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default Home
