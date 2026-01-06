

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion"; // Animation library
// import { Clock, Calendar, Video, MapPin, User, AlertCircle } from "lucide-react";
// import Navbar from "../components/Navbar"; // Assuming you have this from your dashboard


// export default function MyAppointment() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeLeft, setTimeLeft] = useState({}); 
//   const navigate = useNavigate();

//   const patientEmail = localStorage.getItem("patient_email");

//   // ✅ Fetch Appointments (Logic Preserved)
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const patientId = localStorage.getItem("patient_id");
//         if (!patientId) {
//           setError("No patient ID found.");
//           setLoading(false);
//           return;
//         }

//         const res = await fetch(`https://smart-health-server.onrender.com/api/appointments/${patientId}`);
//         if (!res.ok) throw new Error("Failed to fetch appointments.");
        
//         const data = await res.json();
//         setAppointments(data);
//       } catch (err) {
//         console.error("Error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAppointments();
//   }, []);

//   // 🕒 Helper: 12h -> 24h
//   const parseTime12Hour = (timeStr) => {
//     if (!timeStr) return { hours: 0, minutes: 0 };
//     const [time, meridiem] = timeStr.split(" ");
//     let [hours, minutes] = time.split(":").map(Number);
//     if (meridiem === "PM" && hours !== 12) hours += 12;
//     if (meridiem === "AM" && hours === 12) hours = 0;
//     return { hours, minutes };
//   };

//   // ⏳ Logic: Calculate Seconds Left
//   const calculateSecondsLeft = (dateStr, timeStr) => {
//     try {
//       if (!dateStr || !timeStr) return 0;
//       const dateObj = new Date(dateStr);
//       const year = dateObj.getFullYear();
//       const month = dateObj.getMonth();
//       const day = dateObj.getDate();

//       const { hours, minutes } = parseTime12Hour(timeStr);
//       const appointmentDate = new Date(year, month, day, hours, minutes, 0);
//       const now = new Date();
//       const diffInSeconds = Math.floor((appointmentDate - now) / 1000);

//       return diffInSeconds > 0 ? diffInSeconds : 0;
//     } catch (e) {
//       return 0;
//     }
//   };

//   // 🕐 Timer Effect
//   useEffect(() => {
//     if (appointments.length === 0) return;
//     const initialTimers = {};
//     appointments.forEach((app) => {
//       initialTimers[app.appointment_id] = calculateSecondsLeft(app.appointment_date, app.appointment_time);
//     });
//     setTimeLeft(initialTimers);

//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         const updated = {};
//         for (const key in prev) {
//           updated[key] = prev[key] > 0 ? prev[key] - 1 : 0;
//         }
//         return updated;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [appointments]);

//   // 🧮 Format Countdown
//   const formatTime = (seconds) => {
//     if (seconds <= 0) return "Ready";
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs}h ${mins}m ${secs}s`;
//   };

//   const handleStartVideo = (doctorEmail) => {
//     navigate("/patientvideocall", { state: { doctorEmail, patientEmail } });
//   };

//   // Loading State
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50 text-gray-500 font-medium">
//         Loading appointments...
//       </div>
//     );
//   }

//   return (

//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans selection:bg-gray-200">
      
//       <Navbar />

//       {/* Header */}
//       <header className="max-w-6xl mx-auto px-6 md:px-12 py-10 border-b border-gray-100">
//         <motion.h1 
//           initial={{ opacity: 0, y: -10 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           className="text-3xl font-semibold tracking-tight text-gray-900"
//         >
//           My Appointments
//         </motion.h1>
//         <motion.p 
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ delay: 0.1 }}
//           className="text-gray-500 mt-2 text-sm"
//         >
//           Manage your upcoming consultations and join video calls.
//         </motion.p>
//       </header>

//       {/* Main Grid */}
//       <main className="max-w-6xl mx-auto px-6 md:px-12 py-12">
//         {appointments.length === 0 ? (
//           <div className="text-center py-20 text-gray-400">
//             <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
//             <p>No upcoming appointments found.</p>
//           </div>
//         ) : (
//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: { opacity: 0 },
//               visible: {
//                 opacity: 1,
//                 transition: { staggerChildren: 0.1 }
//               }
//             }}
//           >
//             {appointments.map((app) => {
//               const remaining = timeLeft[app.appointment_id] || 0;
//               const isTimeUp = remaining === 0;
//               const displayDate = new Date(app.appointment_date).toLocaleDateString("en-US", {
//                 weekday: 'short', month: 'short', day: 'numeric'
//               });

//               return (
//                 <motion.div
//                   key={app.appointment_id}
//                   variants={{
//                     hidden: { opacity: 0, y: 20 },
//                     visible: { opacity: 1, y: 0 }
//                   }}
//                   whileHover={{ y: -4, transition: { duration: 0.2 } }}
//                   className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
//                 >
//                   {/* Card Header */}
//                   <div>
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="bg-blue-50 p-2.5 rounded-xl">
//                         <User className="w-6 h-6 text-blue-600" />
//                       </div>
//                       {isTimeUp && (
//                         <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
//                           Live Now
//                         </span>
//                       )}
//                     </div>

//                     <h2 className="text-xl font-semibold text-gray-900 mb-1">
//                       Dr. {app.doctor_email?.split("@")[0]}
//                     </h2>
//                     <p className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
//                       <MapPin className="w-3.5 h-3.5" />
//                       {app.location || "Online Consultation"}
//                     </p>

//                     {/* Details Block */}
//                     <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-6">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-500 flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-gray-400" /> Date
//                         </span>
//                         <span className="font-medium text-gray-800">{displayDate}</span>
//                       </div>
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-500 flex items-center gap-2">
//                           <Clock className="w-4 h-4 text-gray-400" /> Time
//                         </span>
//                         <span className="font-medium text-gray-800">{app.appointment_time}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Footer Action */}
//                   <div className="mt-auto">
//                     {isTimeUp ? (
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => handleStartVideo(app.doctor_email)}
//                         className="w-full bg-black text-white py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-gray-200 hover:bg-gray-800 transition-colors"
//                       >
//                         <Video size={18} />
//                         Join Video Call
//                       </motion.button>
//                     ) : (
//                       <div className="w-full bg-gray-100 text-gray-600 py-3.5 rounded-full font-mono text-xs font-medium text-center flex items-center justify-center gap-2 cursor-not-allowed opacity-80">
//                          <span className="relative flex h-2 w-2">
//                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
//                             <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
//                           </span>
//                         Starts in {formatTime(remaining)}
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         )}
//       </main>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Animation library
import { Clock, Calendar, Video, MapPin, User, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar"; // Assuming you have this from your dashboard

export default function MyAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState({}); 
  const navigate = useNavigate();

  const patientEmail = localStorage.getItem("patient_email");

 
   

  // ✅ Fetch Appointments (Logic Preserved)
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const patientId = localStorage.getItem("patient_id");
        if (!patientId) {
          setError("No patient ID found.");
          setLoading(false);
          return;
        }

 const res = await fetch(`https://smart-health-server.onrender.com/api/appointments/${patientId}`);
       
        if (!res.ok) throw new Error("Failed to fetch appointments.");
        
        const data = await res.json();


     

        localStorage.setItem("doctorEmail",data[0].doctor_email)
        localStorage.setItem("appointmentId",data[0].patient_id)

        setAppointments(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);


  // 🕒 Helper: 12h -> 24h
  const parseTime12Hour = (timeStr) => {
    if (!timeStr) return { hours: 0, minutes: 0 };
    const [time, meridiem] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
    return { hours, minutes };
  };

  // ⏳ Logic: Calculate Seconds Left
  const calculateSecondsLeft = (dateStr, timeStr) => {
    try {
      if (!dateStr || !timeStr) return 0;
      const dateObj = new Date(dateStr);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const day = dateObj.getDate();

      const { hours, minutes } = parseTime12Hour(timeStr);
      const appointmentDate = new Date(year, month, day, hours, minutes, 0);
      const now = new Date();
      const diffInSeconds = Math.floor((appointmentDate - now) / 1000);

      return diffInSeconds > 0 ? diffInSeconds : 0;
    } catch (e) {
      return 0;
    }
  };

  // 🕐 Timer Effect
  useEffect(() => {
    if (appointments.length === 0) return;
    const initialTimers = {};
    appointments.forEach((app) => {
      initialTimers[app.appointment_id] = calculateSecondsLeft(app.appointment_date, app.appointment_time);
    });
    setTimeLeft(initialTimers);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const updated = {};
        for (const key in prev) {
          updated[key] = prev[key] > 0 ? prev[key] - 1 : 0;
        }
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [appointments]);

  // 🧮 Format Countdown
  const formatTime = (seconds) => {
    if (seconds <= 0) return "Ready";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const handleStartVideo = () => {
   
    navigate("/patientvideocall");
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 text-gray-500 font-medium">
        Loading appointments...
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans selection:bg-gray-200">
      <Navbar />

      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 md:px-12 py-10 border-b border-gray-100">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-3xl font-semibold tracking-tight text-gray-900"
        >
          My Appointments
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="text-gray-500 mt-2 text-sm"
        >
          Manage your upcoming consultations and join video calls.
        </motion.p>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {appointments.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No upcoming appointments found.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {appointments.map((app) => {
              const remaining = timeLeft[app.appointment_id] || 0;
              const isTimeUp = remaining === 0;
              const displayDate = new Date(app.appointment_date).toLocaleDateString("en-US", {
                weekday: 'short', month: 'short', day: 'numeric'
              });

              return (
                <motion.div
                  key={app.appointment_id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-blue-50 p-2.5 rounded-xl">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      {isTimeUp && (
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                          Live Now
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      Dr. {app.doctor_email?.split("@")[0]}
                    </h2>
                    <p className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {app.location || "Online Consultation"}
                    </p>

                    {/* Details Block */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" /> Date
                        </span>
                        <span className="font-medium text-gray-800">{displayDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" /> Time
                        </span>
                        <span className="font-medium text-gray-800">{app.appointment_time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-auto">
                    {isTimeUp ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStartVideo()}
                        className="w-full bg-black text-white py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-gray-200 hover:bg-gray-800 transition-colors"
                      >
                        <Video size={18} />
                        Join Video Call
                      </motion.button>
                    ) : (
                      <div className="w-full bg-gray-100 text-gray-600 py-3.5 rounded-full font-mono text-xs font-medium text-center flex items-center justify-center gap-2 cursor-not-allowed opacity-80">
                         <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
                          </span>
                        Starts in {formatTime(remaining)}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>
    </div>
  );
}