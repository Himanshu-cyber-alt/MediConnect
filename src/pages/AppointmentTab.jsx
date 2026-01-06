

import React, { useState, useEffect } from "react";
import { Calendar, User, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

export default function AppointmentBooking() {
  const location = useLocation();
  const { doctor } = location.state || {};
  const navigate = useNavigate();

  const [selectedSlot, setSelectedSlot] = useState("");
  const [form, setForm] = useState({
    name: "",
    location: "",
    age: "",
    symptoms: "",
  });

  // ✅ FIX 1: Initialize selectedDate with time stripped (00:00:00)
  // This ensures it matches the calendar date format exactly.
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Reset slot if date changes
  useEffect(() => {
    setSelectedSlot("");
  }, [selectedDate]);

  // ✅ FIX 2: robust "isSlotAvailable" logic
  const isSlotAvailable = (slot) => {
    if (!selectedDate) return false;

    const now = new Date(); // Current real time (e.g., 6:12 PM)
    
    // Create a "Today" date object at 00:00:00 for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the selected date is in the past
    if (selectedDate < today) return false;

    // Check if the selected date is in the future (Tomorrow onwards)
    // If it is future, ALL slots are open.
    if (selectedDate > today) return true;

    // --- LOGIC FOR "TODAY" ---
    // If we are here, it means selectedDate === today.
    // We must parse the slot time (e.g., "7:00 PM") and compare with 'now'
    
    const [time, modifier] = slot.split(" "); // ["7:00", "PM"]
    let [hours, minutes] = time.split(":").map(Number);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    // Create a date object for this specific slot on Today
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);

    // Only return true if the slot is in the future
    return slotTime > now;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.age || !form.symptoms || !selectedDate || !selectedSlot) {
      alert("Please fill all fields and select a time slot.");
      return;
    }

    try {
      const patientId = localStorage.getItem("patient_id");
      const doctorEmail = doctor?.email;

      // Formatting date for API
      const offsetDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));
      const localDate = offsetDate.toISOString().split('T')[0];
      const time = selectedSlot;

      const response = await fetch("https://smart-health-server.onrender.com/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: patientId,
          doctor_email: doctorEmail,
          patient_name: form.name,
          age: form.age,
          symptoms: form.symptoms,
          location: form.location,
          appointment_date: localDate,
          appointment_time: time,
        }),
      });

      if (!response.ok) throw new Error("Failed to create appointment");
      const data = await response.json();
      navigate("/myappointments", { state: { patient_name: data.patient_name } });
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Try again later.");
    }
  };

  // ✅ Updated Time Slots (10 AM to 11 PM as requested)
  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
    "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
    "10:00 PM", "10:30 PM", "11:00 PM"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-indigo-100 to-white text-gray-900 font-sans flex flex-col">
      <Navbar />
      <header className="flex justify-between items-center px-12 py-8 border-b border-gray-200 bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-black-700 flex items-center gap-2">
          <Calendar className="w-7 h-7 text-black-500" />
          Book Appointment
        </h1>
        <p className="text-sm text-gray-500"></p>
      </header>

      <main className="flex-grow px-6 md:px-12 py-12 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-3xl shadow-2xl w-full max-w-5xl p-10 md:p-14 space-y-14 transform transition-all duration-500 hover:shadow-blue-200"
        >
          {/* Patient Info Section */}
          <section>
            <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-8 gap-3">
              <User className="w-6 h-6 text-black" />
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[ 
                { label: "Full Name", name: "name", type: "text" },
                { label: "Location (City / State)", name: "location", type: "text" },
                { label: "Age", name: "age", type: "number" },
                { label: "Symptoms", name: "symptoms", type: "text" },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-2xl px-5 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Date & Time Section */}
          <section>
            <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-8 gap-3">
              <Clock className="w-6 h-6 text-black" />
              Select Date & Time
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Date Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-3">Select Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    // Ensure any new date selected has time stripped to 00:00:00
                    if (date) date.setHours(0,0,0,0);
                    setSelectedDate(date);
                  }}
                  minDate={new Date()} // React-datepicker handles the "minDate" visual logic automatically
                  dateFormat="MMMM d, yyyy"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 text-base bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all hover:bg-white"
                  calendarClassName="rounded-xl shadow-2xl border border-gray-100 p-3"
                  placeholderText="Choose a date"
                  onKeyDown={(e) => e.preventDefault()}
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-3">Available Time Slots</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => {
                    const available = isSlotAvailable(slot);

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!available}
                        onClick={() => available && setSelectedSlot(slot)}
                        // ✅ Styles: If not available, use grey background and remove hover effects
                        className={`px-4 py-3 rounded-2xl border text-sm font-medium transition-all duration-300
                          ${
                            selectedSlot === slot
                              ? "bg-black text-white border-green-600 shadow-md scale-105"
                              : available
                                ? "bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:bg-blue-50 cursor-pointer"
                                : "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
                          }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {!selectedSlot && (
                  <p className="text-xs text-gray-400 mt-2">Past times for today are disabled.</p>
                )}
              </div>
            </div>
          </section>

          <div className="pt-10 border-t border-gray-500 flex justify-end">
            <button
              type="submit"
              className="px-12 py-3 bg-black text-white rounded-2xl text-base font-semibold shadow-lg hover:bg-gray-800 hover:shadow-green-300 transition-all duration-300"
            >
              Save and Continue →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
