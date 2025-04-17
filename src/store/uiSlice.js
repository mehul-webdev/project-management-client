import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toaster: {
    message: "",
    type: "",
  },
};

const uiSlice = createSlice({
  name: "Ui",
  initialState,
  reducers: {
    updateToaster: (state, action) => {
      const { type, message } = action.payload;
      state.toaster = {
        type,
        message,
      };
    },
    clearToaster: (state) => {
      state.toaster = {
        message: "",
        type: "",
      };
    },
  },
});

// Export actions

export const { updateToaster } = uiSlice.actions;

export default uiSlice.reducer;
