import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config";

// Fetch all mothers from IPD birth-report endpoint
export const fetchMothers = createAsyncThunk(
  "birthAndDeth/fetchMothers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/birth-report/ipd/mother`);
      if (!res.ok) {
        const text = await res.text();
        console.log("fetchMothers error response text:", text);
        return rejectWithValue(text || "Failed to fetch mothers");
      }
      const data = await res.json();
      // Normalize: if response wraps list in data/content, try to extract
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.data)) return data.data;
      if (Array.isArray(data.content)) return data.content;
      // If object with items property
      if (Array.isArray(data.items)) return data.items;
      // Fallback: try to find any array inside object
      const arr = Object.values(data).find((v) => Array.isArray(v));
      if (Array.isArray(arr)) return arr;
      // Otherwise return empty
      return [];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

export const createBirthCertificate = createAsyncThunk(
  "birthAndDeth/createBirthCertificate",
  async (certificateData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/birth-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(certificateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData || "Failed to create certificate");
      }

      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

const birthAndDethSlice = createSlice({
  name: "birthAndDeth",
  initialState: {
    mothers: [],
    status: "idle", // for fetchMothers
    error: null, // for fetchMothers
    creationStatus: "idle", // for createBirthCertificate
    creationError: null, // for createBirthCertificate
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMothers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMothers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mothers = action.payload;
      })
      .addCase(fetchMothers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Reducers for createBirthCertificate
      .addCase(createBirthCertificate.pending, (state) => {
        state.creationStatus = "loading";
        state.creationError = null;
      })
      .addCase(createBirthCertificate.fulfilled, (state) => {
        state.creationStatus = "succeeded";
      })
      .addCase(createBirthCertificate.rejected, (state, action) => {
        state.creationStatus = "failed";
        state.creationError = action.payload || action.error.message;
      });
  },
});

export default birthAndDethSlice.reducer;

export const selectAllMothers = (state) => state.birthAndDeth?.mothers;
export const selectMothersStatus = (state) => state.birthAndDeth?.status;
export const selectMothersError = (state) => state.birthAndDeth?.error;
export const selectCreationStatus = (state) =>
  state.birthAndDeth?.creationStatus;
export const selectCreationError = (state) => state.birthAndDeth?.creationError;
