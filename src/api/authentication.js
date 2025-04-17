import { axiosInstance } from ".";

export const UserLogin = async (values) => {
  try {
    const response = await axiosInstance.post(
      "/authentication/sign-in",
      values
    );

    return response.data;
  } catch (err) {
    return err?.response?.data || err.message;
  }
};

export const HandleCheckUserLoggedIn = async () => {
  try {
    const response = await axiosInstance.get("/authentication/status");
    return response.data;
  } catch (err) {
    return err?.response?.data || err.message;
  }
};

export const HandleUserLogout = async () => {
  try {
    const response = await axiosInstance.get("/authentication/logout");
    return response.data;
  } catch (err) {
    return err?.response?.data || err.message;
  }
};
