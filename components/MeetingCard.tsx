"use client"

import React from 'react'
import { LucideIcon, Copy, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Chip } from './ui/chip'
import { toast } from 'sonner'

interface MeetingCardProps {
    title: string;
    date: string;
    icon: LucideIcon;
    isPreviousMeeting?: boolean;
    buttonIcon1?: LucideIcon;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
    icon: Icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1: ButtonIcon,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {
    return (
        <section className={cn(
            "flex min-h-[240px] w-full flex-col justify-between",
            "rounded-lg bg-[#141414] px-5 py-5 xl:max-w-[568px]",
            "border border-white/[0.06] hover:border-white/[0.13]",
            "transition-all duration-300 group overflow-hidden relative"
        )}>
            {/* Top row: date + menu */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-medium text-white/35 tracking-wide uppercase">
                        {isPreviousMeeting ? 'Ended' : 'Scheduled'}
                    </span>
                    <p className="text-sm text-white/55 font-medium">{date}</p>
                </div>
                <button className="size-7 flex items-center justify-center rounded-lg hover:bg-white/6 transition-colors">
                    <MoreHorizontal className="size-4 text-white/30" />
                </button>
            </div>

            {/* Icon + title */}
            <article className="flex flex-col gap-3">
                <div className={cn(
                    "flex size-10 items-center justify-center rounded-xl",
                    "bg-white/5 border border-white/6",
                    "group-hover:bg-white/8 transition-colors duration-300"
                )}>
                    <Icon className="text-white/70 size-5 group-hover:text-white/90 transition-colors duration-300" />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-semibold leading-tight line-clamp-2 text-white/90 group-hover:text-white transition-colors duration-300">
                        {title}
                    </h1>
                    <div className="flex flex-wrap gap-1.5">
                        <Chip label={isPreviousMeeting ? 'Ended' : 'Upcoming'} color={isPreviousMeeting ? 'muted' : 'green'} size="sm" />
                        {buttonText && <Chip label={buttonText} color="navy" size="sm" />}
                    </div>
                </div>
            </article>

            {/* Action buttons */}
            <article className="flex justify-between items-center pt-2 border-t border-white/[0.05]">
                <div className="flex gap-2">
                    {!isPreviousMeeting && (
                        <>
                            <Button
                                onClick={handleClick}
                                variant="primary"
                                size="sm"
                            >
                                {ButtonIcon && <ButtonIcon className="size-3.5" />}
                                {buttonText}
                            </Button>
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(link);
                                    toast.success("Link Copied");
                                }}
                                variant="secondary"
                                size="sm"
                            >
                                <Copy className="size-3.5" />
                                Copy
                            </Button>
                        </>
                    )}
                    {isPreviousMeeting && buttonText && (
                        <Button onClick={handleClick} variant="primary" size="sm">
                            {ButtonIcon && <ButtonIcon className="size-3.5" />}
                            {buttonText}
                        </Button>
                    )}
                </div>
            </article>
        </section>
    )
}

export default MeetingCard