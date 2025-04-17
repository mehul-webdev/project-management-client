import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/project-management/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
