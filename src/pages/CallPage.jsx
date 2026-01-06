import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function CallPage() {
  const { roomId } = useParams();

  console.log(roomId)
  const jitsiRef = useRef(null);

  useEffect(() => {
    const api = new window.JitsiMeetExternalAPI("meet.jit.si", {
      roomName: roomId,
      parentNode: jitsiRef.current,

      
    });

    return () => api.dispose();
  }, [roomId]);

  return <div ref={jitsiRef} className="w-full h-screen" />;
}
