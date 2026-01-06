





// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Stethoscope, User, CalendarDays, Bot } from "lucide-react";

// const Navbar = () => {
//   const location = useLocation();

//   const navItems = [
//     { path: "/dashboard", label: "Dashboard", icon: Stethoscope },
//     { path: "/doctors", label: "Doctors", icon: User },
//     { path: "/assistant", label: "Ask AI", icon: Bot },
//     { path: "/profile", label: "Profile", icon: CalendarDays },
//     { path: "/myappointments", label: "MyAppointments", icon: Stethoscope },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       // 👇 CHANGED: "fixed" -> "sticky". Removed "left-0 right-0" as sticky naturally takes width.
//       className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg backdrop-blur-md"
//     >
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="flex justify-between items-center h-16">
//           {/* Brand / Logo */}
//           <div className="text-2xl font-bold tracking-tight flex items-center space-x-2">
//             <Stethoscope className="w-6 h-6 text-indigo-400" />
//             <span>Smart Healthcare</span>
//           </div>

//           {/* Navigation Links */}
//           <div className="flex items-center space-x-8">
//             {navItems.map(({ path, label, icon: Icon }) => (
//               <Link
//                 key={path}
//                 to={path}
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                   location.pathname === path
//                     ? "bg-indigo-600 text-white shadow-md"
//                     : "text-gray-300 hover:text-white hover:bg-gray-800"
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span>{label}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, User, CalendarDays, Bot, Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu toggle

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Stethoscope },
    { path: "/doctors", label: "Doctors", icon: User },
    { path: "/assistant", label: "Ask AI", icon: Bot },
    { path: "/profile", label: "Profile", icon: User }, // Changed icon to User to avoid dupes
    { path: "/myappointments", label: "My Appts", icon: CalendarDays },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. LOGO */}
          <Link to="/dashboard" className="text-xl sm:text-2xl font-bold tracking-tight flex items-center space-x-2">
            <Stethoscope className="w-6 h-6 text-indigo-400" />
            <span>Smart Healthcare</span>
          </Link>

          {/* 2. DESKTOP MENU (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === path
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* 3. MOBILE HAMBURGER BUTTON (Visible only on Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-700 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)} // Close menu when clicked
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === path
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;