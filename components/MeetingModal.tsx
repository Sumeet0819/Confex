import React from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from 'next/image';
import { Button } from './ui/button';

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    buttonText?: string;
    children: React.ReactNode;
    handleClick: () => void;
    image?: string;
    buttonIcon?: string;
}

const MeetingModal = ({ isOpen, onClose, title, className, buttonText, children, buttonIcon, handleClick, image }: MeetingModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='flex flex-col w-full max-w-[520px] border-none bg-[#1c1e2e] text-white'>
                <div className='flex flex-col gap-6'>
                    {image && (
                        <div className='flex-center mb-6'>
                            <Image src={image} alt='meeting image' width={720} height={304} className='object-cover' />
                        </div>
                    )}
                    <h1 className={`text-2xl font-bold capitalize ${className}`}>{title}</h1>
                    {children}
                    <Button className='w-full bg-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer' onClick={handleClick}>
                        {buttonText || 'Schedule Meeting'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MeetingModal