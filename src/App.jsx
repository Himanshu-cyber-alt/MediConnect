

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

// patient pages
import PatientRegister from "./pages/PatientRegister";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PatientDashboard from "./pages/PatientDashboard";
import Doctors from "./DoctorPages/Doctors";
import PatientVideoCall from "./pages/PatientVideoCall";

// doctor pages
import DoctorRegister from "./DoctorPages/DoctorRegister";
import DoctorLogin from "./DoctorPages/DoctorLogin";
import DoctorDashboard from "./DoctorPages/DoctorDashboard";
import AIAssistant from "./pages/AIAssistant";
import Appointment from "./pages/AppointmentTab"
import MyAppointment from "./pages/MyAppointment";
import TakeInfo from "./pages/TakeInfo";
import DoctorHome from "./DoctorPages/DoctorHome";
import DoctorAppointment from "./DoctorPages/DoctorAppointment.jsx"
import CallPage from "./pages/CallPage.jsx";

function App() {

  const id = localStorage.getItem("patient_id");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Patient routes */}
        <Route path="/register" element={<PatientRegister />} />
        
        <Route path="/login" element={<Login />} />

         {/* <Route
          path="/dashboard"
          element={ 
         
              <PatientDashboard />
           
          
          }
        /> */}





        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <PatientDashboard />
    </ProtectedRoute>
  }
/>



        <Route path="/profile" element={ <ProtectedRoute><Profile /> </ProtectedRoute>} />

        <Route path = "/take-info" element={<TakeInfo/>} />

        {/* Protected patient routes */}
       
        <Route
          path="/patientvideocall"
          element={
          <ProtectedRoute>
              <PatientVideoCall />
           </ProtectedRoute>
          
          }
        />

        <Route path="/assistant" element=
        
        {
        <ProtectedRoute>
        <AIAssistant />
         </ProtectedRoute>
   
      } 
      
        />
           <Route path="/call/:roomId" element={<CallPage />} />
        <Route path="/appointment" element={  <ProtectedRoute> <Appointment /> </ProtectedRoute>} />
        <Route path = "/myappointments" element = { <ProtectedRoute><MyAppointment/> </ProtectedRoute>}/>
        <Route path="/doctors" element={   <Doctors /> } />

        {/* Doctor routes */}
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={    <DoctorDashboard />  } />
        <Route path="/doctor-home" element={     <DoctorHome />  }/>
        <Route path="/doctor-appointments" element ={  <DoctorAppointment /> } />
      </Routes>
    </Router>
  );
}

export default App;
