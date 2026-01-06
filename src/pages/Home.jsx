;

import React from "react";
import { Link } from "react-router-dom";



  const token = localStorage.getItem("patientToken"); // only for patients

  console.log("login routes => ",token)

const PatientSection = () => (
  <div className="flex flex-col items-center text-center space-y-6 bg-white bg-opacity-80 rounded-2xl shadow-xl p-10 hover:scale-105 transform transition">
    <h2 className="text-2xl font-bold text-green-700">Patient</h2>
    <p className="text-gray-600">
      Access your health records, book appointments, and manage your profile.
    </p>
    <div className="flex gap-6">
      <Link
        to="/register"
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition"
      >
        Register
      </Link>

      
      <Link
        to="/login"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
      >
        Login
      </Link>
    </div>
  </div>
);

const DoctorSection = () => (
  <div className="flex flex-col items-center text-center space-y-6 bg-white bg-opacity-80 rounded-2xl shadow-xl p-10 hover:scale-105 transform transition">
    <h2 className="text-2xl font-bold text-sky-700">Doctor</h2>
    <p className="text-gray-600">
      Manage patient information, appointments, and medical records securely.
    </p>
    <div className="flex gap-6">
  
      <Link
        to="/doctor/login"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
      >
        Login
      </Link>
    
       <Link
        to="/doctor/register"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
      >
        Register
      </Link>


    </div>
  </div>
);

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-sky-100">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/7722680/pexels-photo-7722680.jpeg')",
        }}
      ></div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-6xl px-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12 drop-shadow-md">
          Smart Healthcare Assistant
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <PatientSection />
          <DoctorSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
