

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Droplet,
  Ruler,
  Weight,
  MapPin,
  HeartPulse,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { getPatientProfile, logout } from "../features/auth/authSlice";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const patientId = localStorage.getItem("patient_id");

  const { profile, isLoading } = useSelector((state) => state.auth);




  useEffect(() => {
    if (!patientId) {
      navigate("/");
      return;
    }

    dispatch(getPatientProfile(patientId));
  }, [dispatch, patientId,navigate]);






  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }


    const handleLogout = () => {
     
    dispatch(logout());
      localStorage.removeItem("patientToken");
    localStorage.removeItem("patient_id");
      navigate("/")
    
  };


 
  return (
  <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
    
    {/* Background image overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-15"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/7722680/pexels-photo-7722680.jpeg')",
      }}
    />

    {/* Content wrapper */}
    <div className="relative z-10">
      <Navbar />

      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-8 py-6 border-b border-gray-200 mt-4 bg-white/80 backdrop-blur rounded-xl mx-4">
        <h1 className="text-3xl font-semibold tracking-tight mb-2 sm:mb-0">
          {profile?.first_name
            ? `Hi, ${profile.first_name}`
            : "Welcome, Patient"}
        </h1>
       <button
  onClick={handleLogout}
  className="px-5 py-2 rounded-full text-sm font-medium 
             text-gray-700 bg-white-70 backdrop-blur 
             border border-gray-200 shadow-sm
             hover:bg-red-700 hover:shadow-md
             transition-all duration-200"
>
  Logout
</button>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {profile ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {[
              { label: "Full Name", value: profile.first_name, icon: User },
              { label: "Gender", value: profile.gender, icon: User },
              { label: "Date of Birth", value: profile.dob, icon: Calendar },
              {
                label: "Blood Group",
                value: profile.blood_group,
                icon: Droplet,
              },
              {
                label: "Height",
                value: profile.height ? `${profile.height} cm` : null,
                icon: Ruler,
              },
              {
                label: "Weight",
                value: profile.weight ? `${profile.weight} kg` : null,
                icon: Weight,
              },
              { label: "Address", value: profile.address, icon: MapPin },
              {
                label: "Conditions",
                value: profile.symptoms,
                icon: HeartPulse,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur rounded-2xl shadow-sm hover:shadow-md transition p-6 flex items-center justify-between border border-gray-100"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h2 className="text-sm text-black">{item.label}</h2>
                  <p className="text-lg font-medium text-black mt-1">
                    {item.value || "—"}
                  </p>
                </div>
                <item.icon className="w-8 h-8 text-black-400" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 mt-20">
            No profile information found.
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-16">
          <motion.button
            onClick={() => navigate("/assistant")}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-full bg-black text-white text-sm font-medium tracking-wide hover:bg-gray-800 transition"
          >
            Assistant
          </motion.button>
        </div>
      </main>
    </div>
  </div>
);



}
