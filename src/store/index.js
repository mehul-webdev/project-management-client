import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import authReducer from "./authentication";
import projectReducer from "./projects";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    projects: projectReducer,
  },
});

export default store;
