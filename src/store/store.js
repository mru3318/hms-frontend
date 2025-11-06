import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import forgotPasswordReducer from "../features/forgotPasswordSlice";
import statesReducer from "../features/statesSlice";
import employeeReducer from "../features/employeeSlice";
import departmentReducer from "../features/departmentSlice";
import assetsReducer from "../features/assetsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    states: statesReducer,
    employee: employeeReducer,
    departments: departmentReducer,
    assets: assetsReducer,
  },
});

export default store;
