


import React, { useState } from "react";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    specialization: "",
  });
  const [message, setMessage] = useState("");

  const specialties = [
    "Allergy, Asthma, Chest",
    "Anesthesiology and Interventional Pain",
    "Audiology",
    "Ayurveda",
    "Cardiology",
    "Cardiothoracic and Vascular Surgery",
    "Dentistry",
    "Dermatology",
    "Developmental Paediatrics",
    "Diabetology",
    "Dietitian",
    "Ear Nose Throat (ENT)",
    "Endocrinology",
    "Family Medicine",
    "Gastroenterology (Digestive System)",
    "General Medicine",
    "General Practitioner",
    "General Surgeon",
    "Gynecology",
    "Gynecology and Infertility",
    "Hepatology",
    "Homeopathy",
    "Infectious Diseases",
    "Interventional Pain Management",
    "Interventional Radiology",
    "Laparoscopic surgery",
    "Medical Genetics",
    "Nephrology (Kidney Diseases)",
    "Neuro and Spine surgery",
    "Neurology",
    "Neurology and Neuromuscular Disease",
    "Neuropsychology",
    "Obstetrics and Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics (Bone and Joint)",
    "Paediatric Neurology",
    "Paediatric Surgery",
    "Paediatrics",
    "Pediatric Cardiology",
    "Pediatrics and Neonatology",
    "Physical Medicine and Rehabilitation",
    "Physiotherapy",
    "Plastic and Cosmetic Surgery",
    "Plastic and Reconstructive Surgery",
    "Psychiatry",
    "Psychology",
    "Psychotherapy",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Sexology",
    "Spine Surgery",
    "Surgical Gastroenterology and Transplant",
    "Surgical Oncology",
    "Unani Medicine",
    "Urology And Andrology",
    "Yoga",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("https://smart-health-server.onrender.com/api/doctors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Doctor registered successfully!");
      setFormData({ email: "", password: "", specialization: "" });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Doctor Register</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">--Select Specialization--</option>
          {specialties.map((spl, idx) => (
            <option key={idx} value={spl}>
              {spl}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Register
        </button>

        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
};

export default DoctorRegister;
