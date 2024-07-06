import axios from "axios";
import { SearchCondition, PageInfo, ApiResponse } from "../models/Types";
import { User } from "../models/Types";
import { APILink } from "../const/linkAPI";

// Function to fetch users from API
export const getUsers = async (
  searchCondition: SearchCondition,
  pageInfo: PageInfo
): Promise<ApiResponse> => {
  try {
      const response = await axios.post(`${APILink}/api/users/search`, {
          searchCondition,
          pageInfo
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Handle or throw the error as needed
  }
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
