import axios from "axios";
import { SignUpPayload, User } from "../models/Types";

export const getUsers = async () => {
  const response = await axios.get<User[]>(
    "https://665fc1c95425580055b0bf26.mockapi.io/users",
  );
  return response.data;
};

export const registerAccount = {
  signUp: async (userData: SignUpPayload): Promise<User> => {
    const response = await axios.post(
      "https://665fc1c95425580055b0bf26.mockapi.io/students",
      userData,
    );
    return response.data;
  },
};
