

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Home } from "lucide-react";

function DoctorHome() {
  const navigate = useNavigate();
  const doctorEmail = localStorage.getItem("doctor_email");
  console.log(doctorEmail)
  


    const handleLogout = ()=>{
      localStorage.removeItem("doctor_email");
              navigate("/");
    }
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg')",
      }}
    >
      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* 🔹 Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white/90 backdrop-blur-xl shadow-2xl 
                   rounded-3xl p-10 w-full max-w-md text-center"
      >
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold tracking-tight text-gray-900 mb-2"
        >
          Doctor Dashboard
        </motion.h1>

        <p className="text-gray-500 text-sm mb-6">
          Welcome,{" "}
          <span className="font-medium text-gray-800">
            {doctorEmail || "Doctor"}
          </span>
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Actions */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/doctor-appointments")}
          className="w-full flex items-center justify-center gap-2 
                     bg-gray-900 text-white py-4 rounded-full 
                     font-medium text-sm shadow-lg shadow-gray-300 
                     hover:bg-gray-800 transition"
        >
          <Calendar size={18} />
          View Appointments
        </motion.button>

        {/* Secondary Action */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-center gap-2 
                     border border-gray-200 text-gray-700 py-3 
                     rounded-full text-sm font-medium 
                     hover:bg-gray-100 transition"
        >
          <Home size={16} />
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}

export default DoctorHome;
