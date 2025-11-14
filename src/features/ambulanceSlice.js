import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const api = axios.create({ baseURL: API_BASE_URL });

// Fetch options needed for the Add Ambulance form (types, statuses, etc.)
export const fetchAmbulanceFormData = createAsyncThunk(
  "ambulance/fetchFormData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/ambulance/form-data");
      //   console.log("Fetched ambulance form data:", res.data);
      return res.data;
    } catch (err) {
      const payload = err.response
        ? {
            message:
              err.response.data?.message || err.response.data || err.message,
            status: err.response.status,
            url: err.config?.url,
          }
        : { message: err.message || "Network error", code: err.code };
      return rejectWithValue(payload);
    }
  }
);

// Optional: fetch ambulance list
export const fetchAmbulances = createAsyncThunk(
  "ambulance/fetchAmbulances",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/ambulance/list");
      return res.data;
    } catch (err) {
      const payload = err.response
        ? {
            message:
              err.response.data?.message || err.response.data || err.message,
            status: err.response.status,
            url: err.config?.url,
          }
        : { message: err.message || "Network error", code: err.code };
      return rejectWithValue(payload);
    }
  }
);

// Add a new ambulance
export const addAmbulance = createAsyncThunk(
  "ambulance/addAmbulance",
  async (ambulanceData, { rejectWithValue }) => {
    try {
      // Sanitize & normalize payload before sending
      const formatDate = (d) => {
        if (!d) return d;
        // Accept already-ISO dates; otherwise attempt conversion
        if (/^\d{4}-\d{2}-\d{2}/.test(d)) return d; // keep YYYY-MM-DD
        const dt = new Date(d);
        return isNaN(dt.getTime()) ? d : dt.toISOString().split("T")[0];
      };
      const sanitized = {
        vehicleNumber: ambulanceData.vehicleNumber?.trim(),
        ambulanceType: ambulanceData.ambulanceType?.trim()?.toUpperCase(),
        ambulanceStatus: ambulanceData.ambulanceStatus?.trim()?.toUpperCase(),
        lastMaintenanceDate: formatDate(ambulanceData.lastMaintenanceDate),
      };
      console.debug("[addAmbulance] Sending payload", sanitized);
      const res = await api.post("/ambulance/add", sanitized, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (err) {
      console.error(
        "[addAmbulance] Error response",
        err.response?.data || err.message
      );
      const payload = err.response
        ? {
            message:
              err.response.data?.message || err.response.data || err.message,
            status: err.response.status,
            url: err.config?.url,
          }
        : { message: err.message || "Network error", code: err.code };
      return rejectWithValue(payload);
    }
  }
);

const initialState = {
  ambulances: [],
  ambulancesStatus: "idle",
  ambulancesError: null,
  formDataOptions: {
    types: [],
    statuses: [],
  },
  formDataStatus: "idle",
  formDataError: null,
  addStatus: "idle",
  addError: null,
};

const ambulanceSlice = createSlice({
  name: "ambulance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmbulances.pending, (state) => {
        state.ambulancesStatus = "loading";
        state.ambulancesError = null;
      })
      .addCase(fetchAmbulances.fulfilled, (state, action) => {
        state.ambulancesStatus = "succeeded";
        if (action.payload && action.payload.data) {
          state.ambulances = Array.isArray(action.payload.data)
            ? action.payload.data
            : [action.payload.data];
        } else if (Array.isArray(action.payload)) {
          state.ambulances = action.payload;
        } else if (action.payload) {
          state.ambulances = [action.payload];
        } else {
          state.ambulances = [];
        }
      })
      .addCase(fetchAmbulances.rejected, (state, action) => {
        state.ambulancesStatus = "failed";
        state.ambulancesError = action.payload || action.error.message;
      })

      // form data
      .addCase(fetchAmbulanceFormData.pending, (state) => {
        state.formDataStatus = "loading";
        state.formDataError = null;
      })
      .addCase(fetchAmbulanceFormData.fulfilled, (state, action) => {
        state.formDataStatus = "succeeded";
        // normalize response that may be { message, data: { types: [], statuses: [] } }
        const payload = action.payload;
        const data = payload && payload.data ? payload.data : payload;
        if (data) {
          state.formDataOptions.types = data.types || data.ambulanceTypes || [];
          state.formDataOptions.statuses =
            data.statuses || data.ambulanceStatuses || [];
        } else {
          state.formDataOptions = { types: [], statuses: [] };
        }
      })
      .addCase(fetchAmbulanceFormData.rejected, (state, action) => {
        state.formDataStatus = "failed";
        state.formDataError = action.payload || action.error.message;
      });

    // add ambulance
    builder
      .addCase(addAmbulance.pending, (state) => {
        state.addStatus = "loading";
        state.addError = null;
      })
      .addCase(addAmbulance.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        const created =
          action.payload && action.payload.data
            ? action.payload.data
            : action.payload;
        if (created) {
          if (Array.isArray(created))
            state.ambulances = [...created, ...state.ambulances];
          else state.ambulances.unshift(created);
        }
      })
      .addCase(addAmbulance.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload || action.error.message;
      });
  },
});

export default ambulanceSlice.reducer;

// Selectors
export const selectAmbulances = (state) => state.ambulance?.ambulances;
export const selectAmbulancesStatus = (state) =>
  state.ambulance?.ambulancesStatus;
export const selectAmbulancesError = (state) =>
  state.ambulance?.ambulancesError;
export const selectAmbulanceFormData = (state) =>
  state.ambulance?.formDataOptions;
export const selectAmbulanceFormDataStatus = (state) =>
  state.ambulance?.formDataStatus;
export const selectAmbulanceFormDataError = (state) =>
  state.ambulance?.formDataError;
export const selectAddAmbulanceStatus = (state) => state.ambulance?.addStatus;
export const selectAddAmbulanceError = (state) => state.ambulance?.addError;
