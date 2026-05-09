"use client"
import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout, useCall } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { LayoutGrid, Users, LayoutList } from 'lucide-react';
// ... (lines omitted for brevity in replace_file_content logic, but I'll specify exact context)
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import EndCallButton from './EndCallButton';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const router = useRouter();
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);
    const call = useCall();

    useEffect(() => {
        return () => {
            call?.leave();
        };
    }, [call]);

    const renderCallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />;
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition={'left'} />;
            default:
                return <SpeakerLayout participantsBarPosition={'right'} />;
        }
    }

    return (
        <section className="relative h-screen w-full flex overflow-hidden pt-4 text-white">
            <div className='relative flex size-full items-center justify-center'>
                <div className='flex size-full max-w-[1000px] items-center'>
                    {renderCallLayout()}
                </div>
                <div className={cn('h-[calc(100vh-86px)] ml-2 hidden', { 'block': showParticipants })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>
            <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap pb-8'>
                <CallControls onLeave={() => router.push('/')} />

                <div className="flex items-center">
                    <DropdownMenu>
                        <div className="flex items-center">
                            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                                <LayoutList size={20} className="text-white" />
                            </DropdownMenuTrigger>
                        </div>
                        <DropdownMenuContent className="border-[#1c1f2e] bg-[#1c1f2e] text-white">
                            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                                <div key={index}>
                                    <DropdownMenuItem
                                        className="cursor-pointer px-4 py-2 hover:bg-[#2e3444]"
                                        onClick={() => {
                                            setLayout(item.toLowerCase() as CallLayoutType)
                                        }}
                                    >
                                        {item}
                                    </DropdownMenuItem>
                                    {index < 2 && <DropdownMenuSeparator className="bg-[#2e3444]" />}
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center">
                    <Button
                        onClick={() => setShowParticipants((prev) => !prev)}
                        className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
                    >
                        <Users size={20} className="text-white" />
                    </Button>
                </div>
                <EndCallButton />
            </div>

        </section>
    )
}

export default MeetingRoom