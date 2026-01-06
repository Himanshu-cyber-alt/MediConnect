import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const TakeInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get both phone & patient_id from previous step
  const {patientId } = location.state || {};
  
  console.log(location.state)

 
  console.log("patinet id => ",patientId)
  

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    gender: "",
    symptoms: "",
    dob: "",
    height: "",
    weight: "",
    bloodGroup: "",
    address: "",
  });

  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
    { name: "symptoms", label: "Symptoms", type: "text" },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "height", label: "Height (cm)", type: "number" },
    { name: "weight", label: "Weight (kg)", type: "number" },
    { 
      name: "bloodGroup", 
      label: "Blood Group", 
      type: "select", 
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] 
    },
    { name: "address", label: "Address", type: "text" },
  ];

  // ✅ Submit to backend
  const handleSubmit = async () => {




    if (!patientId) {
      alert("⚠️ Missing patient ID! Please register again.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://smart-health-server.onrender.com/api/patient/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, patient_id: patientId }),
      });

      const data = await res.json();

          console.log(data);
          console.log(res.ok)

      if (res.ok) {
        alert("✅ Patient info saved successfully!");
       localStorage.setItem("patient_id",patientId);
        console.log("Saved Data:", data);
        navigate("/dashboard", { state: { patientId, ...formData } });
      } else {
        alert("❌ Failed to save data: " + data.message);
      }
    } catch (err) {
      console.error("Error saving data:", err);
      alert("⚠️ Something went wrong while saving data.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step < fields.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit(); // last step → save data
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [fields[step].name]: e.target.value });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/7722680/pexels-photo-7722680.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      <div className="relative z-10 w-full max-w-lg mx-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/25 backdrop-blur-2xl shadow-2xl rounded-3xl p-10 text-center border border-white/30"
          >
            <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-md">
              {fields[step].label}
            </h2>

            {fields[step].type === "select" ? (
              <select
                name={fields[step].name}
                value={formData[fields[step].name]}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-white/40 bg-white/30 text-white text-lg backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>
                  Select {fields[step].label}
                </option>
                {fields[step].options.map((opt) => (
                  <option key={opt} value={opt} className="text-gray-900">
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={fields[step].type}
                name={fields[step].name}
                value={formData[fields[step].name]}
                onChange={handleChange}
                placeholder={`Enter ${fields[step].label}`}
                className="w-full p-4 rounded-xl border border-white/40 bg-white/30 text-white text-lg placeholder-white/70 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            <div className="flex justify-between mt-8">
              {step > 0 && (
                <button
                  onClick={handlePrev}
                  className="bg-gray-500/70 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-xl transition duration-300"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={loading}
                className={`${
                  loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white font-semibold py-2 px-6 rounded-xl transition duration-300`}
              >
                {loading
                  ? "Saving..."
                  : step < fields.length - 1
                  ? "Next →"
                  : "Finish"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="mt-6 bg-white/20 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-blue-500 h-3 transition-all duration-500"
            style={{ width: `${((step + 1) / fields.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-white mt-3 text-lg tracking-wide">
          Step {step + 1} of {fields.length}
        </p>
      </div>
    </div>
  );
};

export default TakeInfo;

