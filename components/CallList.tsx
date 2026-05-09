"use client"

import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import { Calendar, History, Play, Video, Inbox } from 'lucide-react';
import { toast } from 'sonner';

const CallListSkeleton = () => (
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
        {[1, 2, 3].map((i) => (
            <div key={i} className="h-[240px] w-full rounded-2xl bg-[#141414] animate-pulse border border-white/5" />
        ))}
    </div>
);

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {

    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recordings;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return "No previous calls";
            case 'upcoming':
                return "No upcoming calls";
            case 'recordings':
                return "No recordings yet";
            default:
                return "";
        }
    }

    const getIcon = () => {
        switch (type) {
            case 'ended':
                return History;
            case 'upcoming':
                return Calendar;
            case 'recordings':
                return Video;
            default:
                return Calendar;
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()));
                const recordings = callData
                    .filter(call => call.recordings.length > 0)
                    .flatMap(call => call.recordings);

                setRecordings(recordings);
            } catch (error) {
                toast.error("Try again later");
            }
        }

        if (type === 'recordings') fetchRecordings();
    }, [type, callRecordings]);

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    if (isLoading) return <CallListSkeleton />

    return (
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-5 text-white'>
            {
                calls && calls.length > 0 ? (
                    calls.map((meeting: Call | CallRecording) => (
                        <MeetingCard
                            key={(meeting as Call).id || (meeting as CallRecording).filename}
                            icon={getIcon()}
                            title={(meeting as Call).state?.custom?.description?.substring(0, 26) || (meeting as CallRecording).filename?.substring(0, 20) || 'No Description'}
                            date={
                                (meeting as Call).state?.startsAt?.toLocaleString() ||
                                ((meeting as CallRecording).start_time ? new Date((meeting as CallRecording).start_time).toLocaleString() : '')
                            }
                            isPreviousMeeting={type === 'ended'}
                            buttonIcon1={type === 'recordings' ? Play : undefined}
                            buttonText={type === 'recordings' ? 'Play' : type === 'upcoming' ? 'Start' : undefined}
                            handleClick={type === 'recordings'
                                ? () => router.push(`${(meeting as CallRecording).url}`)
                                : () => router.push(`/meeting/${(meeting as Call).id}`)
                            }
                            link={type === 'recordings'
                                ? (meeting as CallRecording).url
                                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                            }
                        />
                    ))) : (
                        <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] gap-4 p-8 rounded-3xl bg-[#141414] border border-white/5">
                            <div className="bg-white/5 p-6 rounded-full">
                                <Inbox className="size-12 text-white/20" />
                            </div>
                            <div className="text-center">
                                <h1 className="text-xl font-bold text-white/80">{noCallsMessage}</h1>
                                <p className="text-white/40 mt-1">Check back later for updates</p>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default CallList
