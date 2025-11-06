import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config";

// 1️⃣ Create Async Thunk for Posting Form Data
export const registerEmployee = createAsyncThunk(
  "employee/registerEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      console.log("Employee Data to be sent:", employeeData);

      let config = {};

      if (employeeData instanceof FormData) {
        // If it's FormData (with files), send as multipart/form-data
        // Don't set Content-Type manually, let browser set it with boundary
        config = {
          headers: {
            // Let browser set Content-Type with boundary for FormData
            "Content-Type": "multipart/form-data",
          },
        };
      } else {
        // If it's a regular object (no files), send as JSON
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      }

      const response = await axios.post(
        `${API_BASE_URL}/register/add`,
        employeeData,
        config
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration Error:", error);
      console.error("Error Response:", error.response?.data);
      // ✅ Return full error array if available
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }

      // Fallback to generic message
      return rejectWithValue(error.message || "Something went wrong");

    }
  }
);

// 2️⃣ Slice
const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    loading: false,
    success: false,
    error: null,
    message: null,
  },
  reducers: {
    resetEmployeeState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerEmployee.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(registerEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // prefer a 'message' property from the API payload when available
        state.message = action.payload?.message ?? null;
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = null;
      });
  },
});

export const { resetEmployeeState } = employeeSlice.actions;
export default employeeSlice.reducer;
