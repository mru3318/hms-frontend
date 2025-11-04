import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config";

// ✅ Async thunk to fetch all departments from form-data endpoint
export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming token is stored as 'authToken'
      const response = await axios.get(
        // API_BASE_URL already contains the '/api' segment – avoid doubling it
        `${API_BASE_URL}/register/form-data`,
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      // console.log("fetchDepartments API response:", response.data);
      // helpful debug log when running locally
      // console.debug("fetchDepartments response:", response.data);
      return response.data.departments; // extract departments from the response
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch departments"
      );
    }
  }
);

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Optional: for manual adding or resetting if needed
    resetDepartments: (state) => {
      state.list = [];
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;
