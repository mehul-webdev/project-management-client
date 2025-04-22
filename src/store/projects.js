import { getProjectDetails, getProjectsNames } from "@/api/projects";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSidebarProjectNames = createAsyncThunk(
  "projects/getSidebarProjectNames",
  async () => {
    const response = await getProjectsNames();
    return response;
  }
);

export const handleGetProjectDetails = createAsyncThunk(
  "projects/handleGetProjectDetails",
  async (id) => {
    const response = await getProjectDetails(id);
    return response;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    sidebarProjectNames: {
      data: [],
      loading: false,
      error: false,
    },
    projectDetails: {
      loading: false,
      data: {},
      error: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // To get Project Names for sidebar
    builder.addCase(getSidebarProjectNames.pending, (state) => {
      state.sidebarProjectNames.loading = true;
    });

    builder.addCase(getSidebarProjectNames.fulfilled, (state, action) => {
      state.sidebarProjectNames.data = action.payload.data;
      state.sidebarProjectNames.loading = false;
      state.sidebarProjectNames.error = false;
    });

    builder.addCase(getSidebarProjectNames.rejected, (state) => {
      state.sidebarProjectNames.loading = false;
      state.sidebarProjectNames.error = true;
    });

    // Get Single Product Details

    builder.addCase(handleGetProjectDetails.pending, (state) => {
      state.projectDetails.loading = true;
    });

    builder.addCase(handleGetProjectDetails.fulfilled, (state, action) => {
      state.projectDetails.loading = false;
      state.projectDetails.error = false;
      state.projectDetails.data = action.payload.data;
    });

    builder.addCase(handleGetProjectDetails.rejected, (state) => {
      state.projectDetails.loading = false;
      state.projectDetails.error = true;
      state.projectDetails.data = {};
    });
  },
});

export default projectsSlice.reducer;
