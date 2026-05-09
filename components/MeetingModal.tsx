import React from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    buttonText?: string;
    children?: React.ReactNode;
    handleClick: () => void;
    image?: string;
    buttonIcon?: string;
}

const MeetingModal = ({
    isOpen,
    onClose,
    title,
    className,
    buttonText,
    children,
    handleClick,
    image,
}: MeetingModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='flex flex-col w-full max-w-[480px] border border-white/8 bg-[#0f0f0f] text-white shadow-2xl rounded-lg p-0 overflow-hidden gap-0'>
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.06]">
                    <h2 className={`text-lg font-semibold text-white/90 ${className}`}>
                        {title}
                    </h2>
                </div>

                {/* Body */}
                <div className='flex flex-col gap-5 px-6 py-5'>
                    {image && (
                        <div className='flex-center mb-2'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={image} alt='meeting' className='object-cover rounded-xl max-h-48 w-full' />
                        </div>
                    )}
                    {children}
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                    <Button
                        className='w-full h-11 text-sm font-semibold'
                        variant="primary"
                        onClick={handleClick}
                    >
                        {buttonText || 'Schedule Meeting'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MeetingModal