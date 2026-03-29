

import React from "react";
import { Link } from "react-router-dom";
import { Video, MessageCircle, Phone } from "lucide-react";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/7722680/pexels-photo-7722680.jpeg')",
        }}
      />

      <div className="relative z-10">
        {/* NAVBAR */}
        <nav className="sticky top-0 bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-black">
              MediConnect 
            </h1>

            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-5 py-2 rounded-full border border-gray-300
                           text-sm font-medium text-black
                           hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-full bg-black
                           text-white text-sm font-medium
                           hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left */}
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Consult Doctors Online <br />
              <span className="text-gray-700">Anytime, Anywhere</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Talk to certified doctors via chat, call, or video consultation.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/register"
                className="px-6 py-3 rounded-full bg-black
                           text-white text-sm font-medium
                           hover:bg-gray-800 transition"
              >
                Consult Now
              </Link>

              <Link
                to="/doctors"
                className="px-6 py-3 rounded-full border border-gray-300
                           text-sm font-medium text-black
                           hover:bg-gray-100 transition"
              >
                View Doctors
              </Link>
            </div>
          </div>

          {/* Right – IMAGE (FIXED) */}
          <div className="flex justify-center">
            <img
              src="https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg"
              alt="Doctor consultation"
              className="w-full max-w-md rounded-2xl shadow-sm object-cover"
              loading="lazy"
            />
          </div>
        </section>

        {/* CONSULTATION MODES */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ConsultCard icon={<Video />} title="Video Consultation" />
            <ConsultCard icon={<MessageCircle />} title="Chat Consultation" />
            <ConsultCard icon={<Phone />} title="Audio Consultation" />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
          © 2026 MediConnect • Smart Healthcare Platform
        </footer>
      </div>
    </div>
  );
};

const ConsultCard = ({ icon, title }) => (
  <div className="bg-white/80 backdrop-blur border border-gray-200
                  rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
    <div className="flex justify-center mb-4 text-black">
      {icon}
    </div>
    <h3 className="text-lg font-medium">{title}</h3>
  </div>
);

export default Home;
