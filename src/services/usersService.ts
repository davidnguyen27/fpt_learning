import axios from "axios";
import { SignUpPayload, User, SearchCondition, PageInfo, ApiResponse } from "../models/Types";
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

export const registerAccount = {
  signUp: async (userData: SignUpPayload): Promise<User> => {
    const response = await axios.post(
      "https://665fc1c95425580055b0bf26.mockapi.io/students",
      userData,
    );
    return response.data;
  },
};
