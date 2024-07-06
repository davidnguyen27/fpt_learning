import axios from "axios";
import { User } from "../models/Types";
import { APILink } from "../const/linkAPI";

export const getUsers = async () => {
  const response = await axios.get<User[]>(
    "https://665fc1c95425580055b0bf26.mockapi.io/users",
  );
  return response.data;
};

export const registerUser = async (
  userData: Partial<User["data"]>,
): Promise<User> => {
  try {
    const res = await axios.post<User>(`${APILink}/api/users`, userData);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
