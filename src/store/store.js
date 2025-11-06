import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import forgotPasswordReducer from "../features/forgotPasswordSlice";
import statesReducer from "../features/statesSlice";
import employeeReducer from "../features/employeeSlice";
import departmentReducer from "../features/departmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    states: statesReducer,
    employee: employeeReducer,
    departments: departmentReducer,
  },
});

export default store;
