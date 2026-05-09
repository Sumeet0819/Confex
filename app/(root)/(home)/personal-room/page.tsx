"use client"

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useGetCallById } from '@/hooks/useGetCallById';
import { Copy, Video, ShieldCheck, Link2, Sparkles } from 'lucide-react';

const InfoField = ({ title, description, icon: Icon }: { title: string; description: string; icon: any }) => (
    <div className='flex flex-col gap-1.5'>
        <label className="caption-label flex items-center gap-1.5 px-1">
            <Icon className="size-3 text-white/30" />
            {title}
        </label>
        <div className='flex items-center justify-between p-4 rounded-lg bg-[#141414] border border-white/5 hover:border-white/10 transition-all group'>
            <h1 className='truncate text-base font-semibold lg:text-lg text-white/90 group-hover:text-white transition-colors'>{description}</h1>
        </div>
    </div>
)

const PersonalRoom = () => {
    const { user } = useUser();
    const client = useStreamVideoClient();
    const router = useRouter();

    const meetingId = user?.id;
    const meetingLink = typeof window !== 'undefined' ? `${window.location.origin}/meeting/${meetingId}?personal=true` : ''

    const { call } = useGetCallById(meetingId!);

    const startRoom = async () => {
        if (!client || !user) return;

        if (!call) {
            const newCall = client.call('default', meetingId!);
            await newCall.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                }
            })
        }

        router.push(`/meeting/${meetingId}?personal=true`)
    }

    return (
        <section className='flex size-full flex-col gap-12 text-white'>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                <div className="bg-white/5 p-1.5 rounded-md border border-white/10">
                    <Sparkles className="size-4 text-white/40" />
                </div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">Workspace</span>
            </div>
                <h1 className='text-4xl font-black tracking-tight'>
                    Personal Meeting Room
                </h1>
                <p className="text-white/40 text-lg max-w-[600px]">Your permanent space for instant collaboration. Manage access and invitation links here.</p>
            </div>

            <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoField 
                        title='Room Title' 
                        description={`${user?.firstName || user?.username || 'User'}'s Private Space`} 
                        icon={Video}
                    />
                    <InfoField 
                        title='Meeting ID' 
                        description={meetingId!} 
                        icon={ShieldCheck}
                    />
                </div>
                
                <div className="flex flex-col gap-1.5">
                    <label className="caption-label flex items-center gap-1.5 px-1">
                        <Link2 className="size-3 text-white/30" />
                        Invite Link
                    </label>
                    <div className='flex items-center justify-between p-4 rounded-lg bg-[#141414] border border-white/5 group hover:border-white/10 transition-all'>
                        <h1 className='truncate text-sm font-medium text-white/40 group-hover:text-white/60 transition-colors'>{meetingLink}</h1>
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            className="h-8"
                            onClick={() => {
                                navigator.clipboard.writeText(meetingLink);
                                toast.success("Link Copied");
                            }}
                        >
                            <Copy className="size-3.5 mr-2" />
                            Copy
                        </Button>
                    </div>
                </div>
            </div>

            <div className='flex gap-4'>
                <Button 
                    variant="primary"
                    size="lg"
                    className='px-12 h-14'
                    onClick={startRoom}
                >
                    <Video className="mr-2 size-5" />
                    Start Meeting
                </Button>
            </div>
        </section>
    )
}

export default PersonalRoom