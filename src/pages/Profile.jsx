



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { User, HeartPulse, MapPin, Calendar } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    first_name: "",
    gender: "",
    dob: "",
    height: "",
    weight: "",
    blood_group: "",
    address: "",
    symptoms: "",
  });
  const [loading, setLoading] = useState(true);
  const patientId = localStorage.getItem("patient_id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://smart-health-server.onrender.com/api/patients/${patientId}`);
        const data = await res.json();
        setProfile(data || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (patientId) fetchProfile();
  }, [patientId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://smart-health-server.onrender.com/api/patients/${patientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      alert("✅ Profile updated successfully!");
      setProfile(data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update profile.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
      <Navbar />

      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-8 py-16 border-b border-gray-200 mt-4">
        <h1 className="text-3xl font-semibold tracking-tight mb-2 sm:mb-0">
           Update Profile
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm font-medium text-gray-500 hover:text-gray-800 transition"
        >
          ← Back to Dashboard
        </button>
      </header>

      {/* Form Content */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-12">
        {/* Personal Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Full Name", name: "first_name" },
              { label: "Gender", name: "gender" },
              { label: "Date of Birth", name: "dob", type: "date" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-gray-600 text-sm font-medium mb-1 block">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={profile[field.name] || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Health Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <HeartPulse className="text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-800">Health Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Height (cm)", name: "height", type: "number" },
              { label: "Weight (kg)", name: "weight", type: "number" },
              { label: "Blood Group", name: "blood_group" },
              { label: "Existing Conditions", name: "symptoms" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-gray-600 text-sm font-medium mb-1 block">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={profile[field.name] || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Address Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-800">Address Details</h2>
          </div>

          <textarea
            name="address"
            value={profile.address || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none h-32 resize-none"
            placeholder="Enter your address..."
          />
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpdate}
            className="px-10 py-4 rounded-full bg-black text-white font-medium text-lg hover:bg-gray-800 transition shadow-lg"
          >
             Save Changes
          </motion.button>
        </div>
      </main>
    </div>
  );
}
