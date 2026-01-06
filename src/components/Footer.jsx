import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">Smart AI Health Assistant</h3>
          <p className="text-sm">
            Connecting patients and doctors seamlessly through AI-assisted video calls. 
            Quick symptom analysis, doctor recommendations, and smooth communication—anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm mb-2">Email: support@aihealthassistant.com</p>
          <p className="text-sm mb-4">Phone: +91 98765 43210</p>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-200"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-200"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-200"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-200"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-white/30 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Smart AI Health Assistant. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
