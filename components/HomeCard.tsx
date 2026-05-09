'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Chip, ChipColor } from './ui/chip'

interface HomeCardProps {
    className?: string;
    icon: LucideIcon;
    title: string;
    description: string;
    handleClick?: () => void;
    chipColor?: ChipColor;
}

const HomeCard = ({ className, icon: Icon, title, description, handleClick, chipColor = 'muted' }: HomeCardProps) => {
    return (
        <div
            className={cn(
                'relative min-h-[200px] px-5 py-6 flex flex-col justify-between w-full xl:max-w-[300px]',
                'rounded-lg cursor-pointer group overflow-hidden',
                'bg-[#141414] border border-white/[0.06]',
                'hover:border-white/[0.14] hover:bg-[#1a1a1a]',
                'transition-all duration-300',
                className
            )}
            onClick={handleClick}
        >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(255,255,255,0.04) 0%, transparent 60%)' }}
            />

            {/* Icon */}
            <div className={cn(
                'flex-center size-11 rounded-xl',
                'bg-white/6 group-hover:bg-white/10 transition-colors duration-300',
                'border border-white/6'
            )}>
                <Icon size={20} className="text-white/80 group-hover:text-white transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className='flex flex-col gap-1.5'>
                <h2 className='text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300 leading-tight'>
                    {title}
                </h2>
                <div className="flex items-center gap-2">
                    <Chip label={description} color={chipColor} size="sm" />
                </div>
            </div>
        </div>
    )
}

export default HomeCard
