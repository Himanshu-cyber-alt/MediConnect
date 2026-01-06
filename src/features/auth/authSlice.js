

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { auth, provider } from "../../firebase/firebase.js";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";







export const registerPatient = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    return await authService.register(data);
  }
);



export const loginPatient = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    return await authService.login(data);
  }
);




// Create profile
export const createPatientProfile = createAsyncThunk(
  "auth/createProfile",
  async (profileData, thunkAPI) => {
    try {
      return await authService.createProfile(profileData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get profile
export const getPatientProfile = createAsyncThunk(
  "auth/getProfile",
  async (patient_id, thunkAPI) => {
    try {
      return await authService.getProfile(patient_id);
     
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update profile ✅ FIXED
export const updatePatientProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ patient_id, profileData }, thunkAPI) => {
    try {
      return await authService.updateProfile(patient_id, profileData); // pass 2 args
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);



/* ================= REGISTER ================= */
export const firebaseRegister = createAsyncThunk(
  "auth/firebaseRegister",
   async (_, { rejectWithValue }) => {
    try {
      console.log("hello")
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
          
      const res = await axios.post(
        "https://smart-health-server.onrender.com/api/auth/firebase",
        { token: idToken }
      );
     

      return res.data; // { user, token }
    } catch (err) {
  
      return rejectWithValue(err.response?.data || err.message);
    }
  }

);














const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    profile: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.profile = null;
      localStorage.removeItem("persist:root");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginPatient.pending, (state) => {
  state.isLoading = true;
})
.addCase(loginPatient.fulfilled, (state, action) => {
  state.isLoading = false;
  state.user = action.payload;
})
.addCase(loginPatient.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
})
      .addCase(createPatientProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(getPatientProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

       .addCase(firebaseRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firebaseRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
    
      .addCase(firebaseRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

  },
});

export  const { logout } = authSlice.actions;
export default authSlice.reducer;