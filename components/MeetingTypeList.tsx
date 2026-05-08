'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { meetingTypes } from '@/constants'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

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
                    custom: {
                        description
                    }
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
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 '>
            {meetingTypes.map((type) => (
                <HomeCard
                    key={type.title}
                    title={type.title}
                    description={type.description}
                    icon={type.icon}
                    className={type.color}
                    handleClick={() => setMeetingState(type.type)}
                />
            ))}

            {meetingTypes.map((type) => (
                <MeetingModal
                    key={type.type}
                    isOpen={meetingState === type.type}
                    onClose={() => setMeetingState(undefined)}
                    title={type.modalTitle}
                    className='text-center'
                    buttonText={type.buttonText}
                    handleClick={createMeeting}
                >
                    {null}
                </MeetingModal>
            ))}
        </section>
    )
}

export default MeetingTypeList
