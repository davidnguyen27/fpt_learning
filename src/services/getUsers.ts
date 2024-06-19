import axios from "axios";
import { User } from "../models/Types";

export const getUsers = async () => {
  const response = await axios.get<User[]>(
    "https://665fc1c95425580055b0bf26.mockapi.io/users",
  );
  return response.data;
};
