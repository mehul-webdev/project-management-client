import { axiosInstance } from ".";

export const GetUsers = async (value) => {
  const { email } = value;

  try {
    const response = await axiosInstance.get(`/users/?email=${email}`);

    return response.data;
  } catch (err) {
    return err?.response?.data || err.message;
  }
};
