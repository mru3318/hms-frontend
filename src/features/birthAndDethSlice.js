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

// Fetch all birth reports from the /birth-report endpoint
export const fetchBirthReports = createAsyncThunk(
  "birthAndDeth/fetchBirthReports",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/birth-report`);
      if (!res.ok) {
        const text = await res.text();
        console.log("fetchBirthReports error response text:", text);
        return rejectWithValue(text || "Failed to fetch birth reports");
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

export const searchPatients = createAsyncThunk(
  "birthAndDeth/searchPatients",
  async (_, { rejectWithValue }) => {
    try {
      // Use the same normalization logic as fetchMothers but against
      // the /birth-report/ipd/patient endpoint (no query param).
      const res = await fetch(`${API_BASE_URL}/death-certificate/ipd/patient`);
      console.log("searchPatients fetch response:", res);
      if (!res.ok) {
        const text = await res.text();
        console.log("searchPatients error response text:", text);
        return rejectWithValue(text || "Failed to search patients");
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

// Create Death Certificate
export const createDeathCertificate = createAsyncThunk(
  "birthAndDeth/createDeathCertificate",
  async (deathData, { rejectWithValue }) => {
    try {
      // Map incoming deathData to backend payload expected shape
      // Determine numeric patientId to send (backend expects Long)
      let patientIdValue = null;
      if (deathData.patientId !== undefined && deathData.patientId !== null) {
        const n = Number(deathData.patientId);
        patientIdValue = isNaN(n) ? null : n;
      } else if (deathData.hospitalPatientId) {
        const n2 = Number(deathData.hospitalPatientId);
        patientIdValue = isNaN(n2) ? null : n2;
      }

      const payload = {
        fullName: deathData.deceasedName,
        gender: deathData.gender,
        dateOfDeath: deathData.deathDate,
        timeOfDeath: deathData.deathTime,
        ageAtDeath: Number(deathData.age) || null,
        causeOfDeath: deathData.cause,
        placeOfDeath: deathData.place,
        address: deathData.address,
        attendingDoctor: deathData.doctor,
        issueDate: deathData.issueDate,
        // backend expects patientId (numeric Long)
        patientId: patientIdValue,
      };

      // Do NOT include date of birth in the payload per requirements

      const response = await fetch(`${API_BASE_URL}/death-certificate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("createDeathCertificate response:", response);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData || "Failed to create death certificate"
        );
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
    patients: [],
    birthReports: [],
    status: "idle", // for fetchMothers
    error: null, // for fetchMothers
    creationStatus: "idle", // for createBirthCertificate
    creationError: null, // for createBirthCertificate
    deathCreationStatus: "idle",
    deathCreationError: null,
    searchStatus: "idle",
    searchError: null,
    birthReportsStatus: "idle", // for fetchBirthReports
    birthReportsError: null, // for fetchBirthReports
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

    // Reducers for createDeathCertificate
    builder
      .addCase(createDeathCertificate.pending, (state) => {
        state.deathCreationStatus = "loading";
        state.deathCreationError = null;
      })
      .addCase(createDeathCertificate.fulfilled, (state) => {
        state.deathCreationStatus = "succeeded";
      })
      .addCase(createDeathCertificate.rejected, (state, action) => {
        state.deathCreationStatus = "failed";
        state.deathCreationError = action.payload || action.error.message;
      });

    // Search patients
    builder
      .addCase(searchPatients.pending, (state) => {
        state.searchStatus = "loading";
        state.searchError = null;
      })
      .addCase(searchPatients.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.patients = action.payload;
      })
      .addCase(searchPatients.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.searchError = action.payload || action.error.message;
      });

    // Fetch birth reports
    builder
      .addCase(fetchBirthReports.pending, (state) => {
        state.birthReportsStatus = "loading";
        state.birthReportsError = null;
      })
      .addCase(fetchBirthReports.fulfilled, (state, action) => {
        state.birthReportsStatus = "succeeded";
        state.birthReports = action.payload;
      })
      .addCase(fetchBirthReports.rejected, (state, action) => {
        state.birthReportsStatus = "failed";
        state.birthReportsError = action.payload || action.error.message;
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
export const selectDeathCreationStatus = (state) =>
  state.birthAndDeth?.deathCreationStatus;
export const selectDeathCreationError = (state) =>
  state.birthAndDeth?.deathCreationError;
export const selectPatients = (state) => state.birthAndDeth?.patients;
export const selectPatientsStatus = (state) => state.birthAndDeth?.searchStatus;
export const selectPatientsError = (state) => state.birthAndDeth?.searchError;
export const selectBirthReports = (state) => state.birthAndDeth?.birthReports;
export const selectBirthReportsStatus = (state) =>
  state.birthAndDeth?.birthReportsStatus;
export const selectBirthReportsError = (state) =>
  state.birthAndDeth?.birthReportsError;
