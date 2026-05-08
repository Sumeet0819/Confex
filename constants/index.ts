import { Home, Calendar, History, Video, User, Plus, Presentation, VideoIcon } from "lucide-react";

export const sidebarLinks = [
  {
    label: "Home",
    route: "/",
    imgUrl: "/icons/Home.svg",
    icon: Home,
  },
  {
    label: "Upcoming",
    route: "/upcoming",
    imgUrl: "/icons/upcoming.svg",
    icon: Calendar,
  },
  {
    label: "Previous",
    route: "/previous",
    imgUrl: "/icons/previous.svg",
    icon: History,
  },
  {
    label: "Recordings",
    route: "/recordings",
    imgUrl: "/icons/video.svg",
    icon: Video,
  },
  {
    label: "Personal Room",
    route: "/personal-room",
    imgUrl: "/icons/add-personal.svg",
    icon: User,
  },
];

export const meetingTypes = [
    {
        title: 'New Meeting',
        description: 'Start an instant meeting',
        icon: Plus,
        color: 'bg-amber-400',
        type: 'isInstantMeeting',
        modalTitle: 'Start an Instant Meeting',
        buttonText: 'Start Meeting'
    },
    {
        title: 'Join Meeting',
        description: 'Use given code to join',
        icon: Presentation,
        color: 'bg-blue-400',
        type: 'isJoiningMeeting',
        modalTitle: 'Join a Meeting',
        buttonText: 'Join Meeting'
    },
    {
        title: 'Schedule Meeting',
        description: 'Plan your meeting',
        icon: Calendar,
        color: 'bg-green-400',
        type: 'isScheduleMeeting',
        modalTitle: 'Schedule a Meeting',
        buttonText: 'Schedule Meeting'
    },
    {
        title: 'Recordings',
        description: 'View recordings',
        icon: VideoIcon,
        color: 'bg-purple-400',
        type: 'isRecordings',
        modalTitle: 'View Recordings',
        buttonText: 'Open Recordings'
    },
] as const