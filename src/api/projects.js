import { axiosInstance } from ".";

export const addNewProject = async (data) => {
  try {
    const response = await axiosInstance.post("/project/new-project", data);
    return response.data;
  } catch (err) {
    return err?.response?.data || err.message;
  }
};

export const getProjectsNames = async () => {
  try {
    const response = await axiosInstance.get("/project/get-project-names");
    return response.data;
  } catch (err) {
    return err?.response?.data || err.message;
  }
};

export const getProjectDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/project/get-project/${id}`);
    return response.data;
  } catch (err) {
    return err?.response?.data || err.message;
  }
};
