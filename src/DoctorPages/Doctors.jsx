


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("https://smart-health-server.onrender.com/api/doctors");
        if (res.ok) {
          const data = await res.json();
          setDoctors(data);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  console.log(doctors)

  const handleBookAppointment = (doctor) => {
    navigate("/appointment", { state: { doctor } }); // 👈 pass doctor details
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Doctors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.email} className="bg-white p-6 shadow rounded-2xl border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">{doctor.full_name}</h2>
              <p className="text-gray-700 mt-1">Specialization: {doctor.specialization}</p>
              <p className="mt-2 text-sm">
                <span className={`font-semibold ${doctor.is_online ? "text-green-600" : "text-red-600"}`}>
                  {doctor.is_online ? "Online" : "Offline"}
                </span>
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleBookAppointment(doctor)}
                  className="bg-black hover:shadow-green-900 text-white px-4 py-2 rounded-lg shadow"
                >
                  Book Appointment
                </button>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Doctors;
