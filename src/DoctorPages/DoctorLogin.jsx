


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {firebaseRegister} from "../features/auth/authSlice"
import { useDispatch } from "react-redux";

const DoctorLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
    const dispatch = useDispatch();

  // 🔹 Normal email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("https://smart-health-server.onrender.com/api/doctors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("doctorToken", data.token);
      localStorage.setItem("doctor_email", email);

      navigate("/doctor-home");
    } catch (err) {
      setMessage(err.message);
    }
  };

  // 🔹 Google login (placeholder – hook Firebase later)
  const handleGoogleLogin = async () => {
       try {

             alert("Google login for doctors coming next 🚀");
    } catch (err) {
     console.log(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-teal-100 to-sky-100">

      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/7722680/pexels-photo-7722680.jpeg')",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10">

        {/* Header */}
        <h2 className="text-3xl font-bold text-emerald-700 text-center">
          Doctor Login
        </h2>
        <p className="text-gray-600 text-center mt-2 mb-8">
          Sign in to access your dashboard
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            required
          />

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 
                       text-white font-semibold py-3 rounded-xl 
                       shadow-md transition"
          >
            Login
          </button>
        </form>

        {/* Error message */}
        {message && (
          <p className="text-center text-sm text-red-500 mt-4">
            {message}
          </p>
        )}

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 
                     border border-gray-300 rounded-xl py-3 
                     hover:bg-gray-100 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Not a doctor?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-emerald-600 font-semibold cursor-pointer hover:underline"
          >
            Patient Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;

