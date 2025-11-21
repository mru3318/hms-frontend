import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config";

// 1️⃣ Create Async Thunk for Posting Form Data
export const registerEmployee = createAsyncThunk(
  "employee/registerEmployee",
  async (employeeData, { rejectWithValue, getState }) => {
    try {
      console.log("Employee Data to be sent:", employeeData);
      const state = getState();
      const token =
        state?.auth?.token ||
        (() => {
          try {
            return JSON.parse(localStorage.getItem("auth"))?.token;
          } catch {
            return null;
          }
        })();

      let config = { headers: {} };

      if (employeeData instanceof FormData) {
        // If it's FormData (with files), send as multipart/form-data
        // Don't set Content-Type manually, let browser set it with boundary
        config.headers = {
          // Let browser set Content-Type with boundary for FormData
          "Content-Type": "multipart/form-data",
        };
      } else {
        // If it's a regular object (no files), send as JSON
        config.headers = {
          "Content-Type": "application/json",
        };
      }

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
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

// Fetch employees by roleId
export const fetchEmployeesByRole = createAsyncThunk(
  "employee/fetchByRole",
  async (roleId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        (() => {
          try {
            return JSON.parse(localStorage.getItem("auth"))?.token;
          } catch {
            return null;
          }
        })();
      const response = await axios.get(`${API_BASE_URL}/users/role/${roleId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      // ensure we return an array; backend may wrap the data
      const data = response.data;
      const list = Array.isArray(data)
        ? data
        : data?.dataList ?? data?.data ?? data?.users ?? [];
      return { roleId, list };
    } catch (error) {
      console.error("fetchEmployeesByRole error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update employee status
export const updateEmployeeStatus = createAsyncThunk(
  "employee/updateStatus",
  async ({ userId, status }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token =
        state?.auth?.token ||
        (() => {
          try {
            return JSON.parse(localStorage.getItem("auth"))?.token;
          } catch {
            return null;
          }
        })();
      await axios.put(
        `${API_BASE_URL}/users/${userId}/status`,
        { status },
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      );
      return { userId, status };
    } catch (error) {
      console.error("updateEmployeeStatus error:", error);
      return rejectWithValue(error.response?.data || error.message);
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
    // store employees by roleId to avoid re-fetching when switching tabs
    employeesByRole: {},
    fetchingRole: null,
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
    // fetch employees by role
    builder
      .addCase(fetchEmployeesByRole.pending, (state, action) => {
        state.loading = true;
        state.fetchingRole = action.meta.arg;
        state.error = null;
      })
      .addCase(fetchEmployeesByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchingRole = null;
        const { roleId, list } = action.payload;
        state.employeesByRole[roleId] = list;
      })
      .addCase(fetchEmployeesByRole.rejected, (state, action) => {
        state.loading = false;
        state.fetchingRole = null;
        state.error = action.payload;
      })
      // update status
      .addCase(updateEmployeeStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployeeStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, status } = action.payload;
        // find and update user across stored role lists
        Object.keys(state.employeesByRole).forEach((roleKey) => {
          state.employeesByRole[roleKey] = state.employeesByRole[roleKey].map(
            (emp) => (emp.userId === userId ? { ...emp, status } : emp)
          );
        });
      })
      .addCase(updateEmployeeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetEmployeeState } = employeeSlice.actions;
export default employeeSlice.reducer;
