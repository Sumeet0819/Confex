import React from 'react'
import { cn } from '@/lib/utils'

type ChipColor = 'purple' | 'red' | 'olive' | 'green' | 'navy' | 'amber' | 'blue' | 'pink' | 'muted'
type ChipSize = 'sm' | 'md' | 'lg'

interface ChipProps {
  label: string
  color?: ChipColor
  size?: ChipSize
  className?: string
  onClick?: () => void
}

const colorMap: Record<ChipColor, string> = {
  purple: 'bg-purple-900/60 text-purple-300 border-purple-700/30',
  red:    'bg-red-950/70    text-red-300    border-red-800/30',
  olive:  'bg-yellow-950/60 text-yellow-400  border-yellow-800/20',
  green:  'bg-emerald-950/60 text-emerald-400 border-emerald-800/30',
  navy:   'bg-blue-950/60  text-blue-300   border-blue-800/30',
  amber:  'bg-amber-950/60  text-amber-400   border-amber-800/30',
  blue:   'bg-blue-600/20   text-blue-300   border-blue-600/20',
  pink:   'bg-pink-950/60   text-pink-300   border-pink-800/30',
  muted:  'bg-white/5       text-white/40   border-white/8',
}

const sizeMap: Record<ChipSize, string> = {
  sm: 'text-[10px] px-2.5 py-0.5 rounded-sm',
  md: 'text-xs px-3 py-1 rounded-sm',
  lg: 'text-sm px-4 py-1.5 rounded-sm',
}

/**
 * Chip — UI kit circular/pill badge component.
 * Matches the "Chips" section of the design system.
 */
const Chip = ({ label, color = 'muted', size = 'sm', className, onClick }: ChipProps) => {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center font-medium border tracking-wide select-none',
        'transition-opacity duration-150',
        onClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default',
        colorMap[color],
        sizeMap[size],
        className
      )}
    >
      {label}
    </span>
  )
}

export { Chip, type ChipColor, type ChipProps }
