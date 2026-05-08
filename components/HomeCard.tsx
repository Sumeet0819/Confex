'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HomeCardProps {
    className?: string;
    icon: LucideIcon;
    title: string;
    description: string;
    handleClick?: () => void;
}

const HomeCard = ({ className, icon: Icon, title, description, handleClick }: HomeCardProps) => {
    return (
        <div
            className={cn('min-h-[200px] px-4 py-6 flex flex-col justify-between w-full xl:max-w-[300px] rounded-md cursor-pointer', className)}
            onClick={handleClick}
        >
            <div className='flex-center glassmorphism h-12 w-12 rounded-lg'>
                <Icon size={24} color='white' />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <p className='text-lg font-medium text-sky-100'>{description}</p>
            </div>
        </div>
    )
}

export default HomeCard
