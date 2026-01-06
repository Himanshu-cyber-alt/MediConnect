


// import { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import { Phone, PhoneOff } from "lucide-react";
// import { em } from "framer-motion/client";
// const socket = io("https://smart-health-server.onrender.com");

// export default function DoctorDashboard() {
//   const doctorEmail = localStorage.getItem("doctor_email");
  
//   const localVideo = useRef();
//   const remoteVideo = useRef();
//   const pc = useRef(null);

//   const [incomingCall, setIncomingCall] = useState(null);
//   const [callStatus, setCallStatus] = useState("idle"); // idle | ringing | inCall
//   const [patientSocket, setPatientSocket] = useState(null);
//   const [patientMobile, setPatientMobile] = useState(null);


//   console.log("doctor email => ",doctorEmail)

//   useEffect(() => {
//     socket.emit("registerDoctor", { email: doctorEmail });

//     // when a patient calls this doctor
//     socket.on("incomingCall", ({ patientMobile, patientSocket }) => {
//       setIncomingCall({ patientMobile, patientSocket });
//       setCallStatus("ringing");
//     });

//     socket.on("webrtc-offer", async ({ offer, fromSocket }) => {
//       if (!pc.current) await startWebRTC(fromSocket, false);
//       await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
//       const answer = await pc.current.createAnswer();
//       await pc.current.setLocalDescription(answer);
//       socket.emit("webrtc-answer", { targetSocket: fromSocket, answer });
//     });

//     socket.on("webrtc-ice-candidate", ({ candidate }) => {
//       if (pc.current) pc.current.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     socket.on("callEnded", () => endCall(false));

//     return () => {
//       socket.off("incomingCall");
//       socket.off("webrtc-offer");
//       socket.off("webrtc-ice-candidate");
//       socket.off("callEnded");
//     };
//   }, []);

//   async function startWebRTC(targetSocket, isInitiator = true) {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     localVideo.current.srcObject = stream;

//     pc.current = new RTCPeerConnection();
//     stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));

//     pc.current.ontrack = (event) => {
//       remoteVideo.current.srcObject = event.streams[0];
//     };

//     pc.current.onicecandidate = (event) => {
//       if (event.candidate)
//         socket.emit("webrtc-ice-candidate", { targetSocket, candidate: event.candidate });
//     };

//     if (isInitiator) {
//       const offer = await pc.current.createOffer();
//       await pc.current.setLocalDescription(offer);
//       socket.emit("webrtc-offer", { targetSocket, offer });
//     }
//   }

//   function acceptCall() {
//     if (!incomingCall) return;
//     socket.emit("callResponse", {
//       patientSocket: incomingCall.patientSocket,
//       accepted: true,
//       doctorSocket: socket.id,
//     });
//     startWebRTC(incomingCall.patientSocket);
//     setPatientSocket(incomingCall.patientSocket);
//     setPatientMobile(incomingCall.patientMobile);
//     setCallStatus("inCall");
//     setIncomingCall(null);
//   }

//   function declineCall() {
//     if (!incomingCall) return;
//     socket.emit("callResponse", {
//       patientSocket: incomingCall.patientSocket,
//       accepted: false,
//     });
//     setIncomingCall(null);
//     setCallStatus("idle");
//   }

//   function endCall(emit = true) {
//     if (pc.current) {
//       pc.current.close();
//       pc.current = null;
//     }
//     if (localVideo.current?.srcObject)
//       localVideo.current.srcObject.getTracks().forEach((t) => t.stop());
//     if (remoteVideo.current) remoteVideo.current.srcObject = null;

//     if (emit && patientSocket)
//       socket.emit("callEnded", { targetSocket: patientSocket });

//     setCallStatus("idle");
//     setIncomingCall(null);
  
//   }

//   return (
//     <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center overflow-hidden text-white">
//       {/* Remote video (patient) */}
//       <video
//         ref={remoteVideo}
//         autoPlay
//         playsInline
//         className="absolute w-full h-full object-cover"
//       />

//       {/* Local video (doctor self-view) */}
//       <video
//         ref={localVideo}
//         autoPlay
//         muted
//         playsInline
//         className="absolute bottom-6 right-6 w-44 h-32 rounded-lg border-2 border-white object-cover shadow-lg"
//       />

//       {/* Incoming Call Overlay */}
//       {callStatus === "ringing" && incomingCall && (
//         <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center p-6">
//           <p className="text-xl mb-6">
//             Incoming call from patient: <br />
//             <span className="font-bold text-green-400">{incomingCall.patientMobile}</span>
//           </p>
//           <div className="flex gap-6">
//             <button
//               onClick={acceptCall}
//               className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-full text-lg font-semibold hover:bg-green-700 transition"
//             >
//               <Phone className="w-5 h-5" /> Accept
//             </button>
//             <button
//               onClick={declineCall}
//               className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-full text-lg font-semibold hover:bg-red-700 transition"
//             >
//               <PhoneOff className="w-5 h-5" /> Decline
//             </button>
//           </div>
//         </div>
//       )}

//       {/* End Call Button (when in call) */}
//       {callStatus === "inCall" && (
//         <div className="absolute bottom-10 flex gap-8">
//           <button
//             onClick={() => endCall(true)}
//             className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-full text-lg font-semibold hover:bg-red-700 transition"
//           >
//             <PhoneOff className="w-5 h-5" /> End Call
//           </button>
//         </div>
//       )}

//       {/* Doctor info overlay */}
//       <div className="absolute top-6 left-6 text-gray-200">
//         <h2 className="text-lg font-semibold">Dr. {doctorEmail || "Unknown"}</h2>
//         <p className="text-sm opacity-70">
//           {callStatus === "inCall"
//             ? `In Call with ${patientMobile || "Patient"}`
//             : callStatus === "ringing"
//             ? "Ringing..."
//             : "Waiting for patient call"}
//         </p>
//       </div>
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Phone, PhoneOff } from "lucide-react";

const socket = io("https://smart-health-server.onrender.com");

export default function DoctorDashboard() {
  const doctorEmail = localStorage.getItem("doctor_email");;
  const jitsiRef = useRef(null);

  const [incomingCall, setIncomingCall] = useState(null);
  const [callStatus, setCallStatus] = useState("idle"); // idle | ringing | inCall
  const [roomId, setRoomId] = useState(null);
  

  console.log("doctor email ==>",doctorEmail)


  useEffect(() => {
    socket.emit("registerDoctor", { email: doctorEmail });

socket.on("incomingCall", ({ patientEmail, patientSocket, roomId }) => {
  setIncomingCall({ patientEmail, patientSocket, roomId });
  setCallStatus("ringing");
});


    return () => socket.off("incomingCall");
  }, []);

 function acceptCall() {
  socket.emit("callResponse", {
    accepted: true,
    patientSocket: incomingCall.patientSocket, // 🔥 REQUIRED
    roomId: incomingCall.roomId,
  });

  setRoomId(incomingCall.roomId);
  setCallStatus("inCall");
  setIncomingCall(null);
}


  function declineCall() {
    socket.emit("callResponse", { accepted: false });
    setIncomingCall(null);
    setCallStatus("idle");
  }

  useEffect(() => {
    if (callStatus !== "inCall" || !roomId) return;

    const api = new window.JitsiMeetExternalAPI("meet.jit.si", {
      roomName: roomId,
      parentNode: jitsiRef.current,
      userInfo: { displayName: `Dr. ${doctorEmail}` },
    });

    return () => api.dispose();
  }, [callStatus, roomId]);

  return (
    <div className="w-full h-screen bg-gray-900 text-white relative">
      {callStatus === "ringing" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
          <p className="mb-6 text-xl">
            Incoming call from {incomingCall.patientEmail}
          </p>
          <div className="flex gap-6">
            <button onClick={acceptCall} className="bg-green-600 px-6 py-3 rounded-full">
              <Phone /> Accept
            </button>
            <button onClick={declineCall} className="bg-red-600 px-6 py-3 rounded-full">
              <PhoneOff /> Decline
            </button>
          </div>
        </div>
      )}

      {callStatus === "inCall" && (
        <div ref={jitsiRef} className="w-full h-full" />
      )}
    </div>
  );
}
