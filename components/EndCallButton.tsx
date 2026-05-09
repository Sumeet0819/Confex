'use client';

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();

    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

    if (!isMeetingOwner) return null;

    return (
        <Button 
            onClick={async () => {
                await call?.endCall();
                await call?.leave();
                router.push('/');
            }}
            className='bg-red-500 hover:bg-red-600 text-white rounded-2xl px-4 py-2 font-semibold'
        >
            End Call for Everyone
        </Button>
    );
};

export default EndCallButton;
