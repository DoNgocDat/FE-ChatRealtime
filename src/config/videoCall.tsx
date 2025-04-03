import { useEffect, useRef } from "react";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface VideoCallProps {
  roomName: string;
  displayName: string;
}

const VideoCall = ({ roomName, displayName }: VideoCallProps) => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.JitsiMeetExternalAPI) {
      const domain = "meet.jit.si";
      const options = {
        roomName,
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName,
        },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => {
        api.dispose();
      };
    }
  }, [roomName, displayName]);

  return <div ref={jitsiContainerRef} className="w-full h-[600px] bg-gray-800" />;
};

export default VideoCall;