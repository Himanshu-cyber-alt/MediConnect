


import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerPatient } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { firebaseRegister } from "../features/auth/authSlice";

export default function PatientRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();




 const handleRegister = async () => {
    try {
      const res = await dispatch(
        registerPatient({ email, password })
      ).unwrap();

      localStorage.setItem("patientToken", res.token);
      localStorage.setItem("patient_id", res.patient.patient_id);
      localStorage.setItem("patient_email", email);

      navigate("/take-info", {
        state: { patientId: res.patient.patient_id },
      });
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };




const handleGoogleRegister = async () => {
  try {
    const res = await dispatch(
      firebaseRegister({ email, password })
    ).unwrap();

    console.log("res =>", res);

    if (res.flag) {
      localStorage.setItem("token", res.token);
      navigate("/take-info", {
        state: { patientId: res.user.patient_id },
      });
    } else {
      localStorage.setItem("patient_id", res.user.patient_id);
      localStorage.setItem("patientToken", res.token);
      localStorage.setItem("patient_email", res.user.email);
      navigate("/dashboard");
    }

  } catch (err) {
    console.error("ERROR =>", err);
    alert(err.message || err);
  }
};




 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-teal-100 to-sky-100" >
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

     
      
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Patient Registration
      </h2>
      <p className="text-sm text-gray-500 text-center mt-2">
        Create your account to continue
      </p>

      {/* Form */}
      <div className="mt-8 space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          onChange={(e) => setPassword(e.target.value)}
        />

    
      </div>

      {/* Register button */}
      <button
        onClick={handleRegister}
        className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all"
      >
        Create Account
      </button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="mx-3 text-gray-500 text-sm">OR</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      {/* Google button */}
      <button
        onClick={handleGoogleRegister}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-100 transition"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="font-medium text-gray-700">
          Sign up with Google
        </span>
      </button>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-emerald-600 font-semibold cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  </div>
);

}




