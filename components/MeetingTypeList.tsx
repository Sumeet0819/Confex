'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Plus, Presentation, Calendar, VideoIcon } from 'lucide-react'
import { ChipColor } from './ui/chip'

const meetingTypes = [
    {
        title: 'New Meeting',
        description: 'Instant',
        icon: Plus,
        chipColor: 'amber' as ChipColor,
        type: 'isInstantMeeting' as const,
    },
    {
        title: 'Join Meeting',
        description: 'Join via link',
        icon: Presentation,
        chipColor: 'blue' as ChipColor,
        type: 'isJoiningMeeting' as const,
    },
    {
        title: 'Schedule',
        description: 'Plan ahead',
        icon: Calendar,
        chipColor: 'green' as ChipColor,
        type: 'isScheduleMeeting' as const,
    },
    {
        title: 'Recordings',
        description: 'View all',
        icon: VideoIcon,
        chipColor: 'purple' as ChipColor,
        type: 'isRecordings' as const,
    },
]

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | 'isRecordings' | undefined>(undefined)
    const [values, setValues] = useState({ dateTime: new Date(), description: '', link: '' });
    const [callDetails, setCallDetails] = useState<Call>();
    const { user } = useUser()
    const client = useStreamVideoClient();

    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast.error("Please select a date and time")
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error("Failed to create call");
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting'

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: { description }
                }
            })
            setCallDetails(call);
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast.success("Meeting Created", { description: "Your meeting has been scheduled successfully." })

        } catch (error) {
            console.log(error)
            toast.error("Failed to create meeting")
        }
    }

    const meetingLink = typeof window !== 'undefined' ? `${window.location.origin}/meeting/${callDetails?.id}` : ''

    return (
        <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
            {meetingTypes.map((type) => (
                <HomeCard
                    key={type.title}
                    title={type.title}
                    description={type.description}
                    icon={type.icon}
                    chipColor={type.chipColor}
                    handleClick={() => {
                        if (type.type === 'isRecordings') {
                            router.push('/recordings')
                        } else {
                            setMeetingState(type.type)
                        }
                    }}
                />
            ))}

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Schedule a Meeting'
                    handleClick={createMeeting}
                >
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1.5'>
                            <label className='caption-label'>Description</label>
                            <textarea
                                placeholder='What is this meeting about?'
                                rows={3}
                                className='input-kit resize-none'
                                onChange={(e) => setValues({ ...values, description: e.target.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label className='caption-label'>Date & Time</label>
                            <ReactDatePicker
                                selected={values.dateTime}
                                onChange={(date: Date | null) => setValues({ ...values, dateTime: date! })}
                                showTimeSelect
                                timeFormat='HH:mm'
                                timeIntervals={15}
                                timeCaption='time'
                                dateFormat='MMMM d, yyyy h:mm aa'
                                className='input-kit w-full'
                                wrapperClassName='w-full'
                            />
                        </div>
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Meeting Created'
                    className='text-center'
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast.success("Link Copied")
                    }}
                    buttonText='Copy Meeting Link'
                />
            )}

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Start an Instant Meeting'
                className='text-center'
                buttonText='Start Meeting'
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Join a Meeting'
                className='text-center'
                buttonText='Join Meeting'
                handleClick={() => router.push(values.link)}
            >
                <div className='flex flex-col gap-1.5'>
                    <label className='caption-label'>Meeting Link or ID</label>
                    <input
                        placeholder='Paste link here…'
                        className='input-kit'
                        onChange={(e) => setValues({ ...values, link: e.target.value })}
                    />
                </div>
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList
