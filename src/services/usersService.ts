import axios from "axios";
import {
  User,
  UserData,
  UserSearchRequest,
  UserSearchResponse,
} from "../models/Types"; // Import types and interfaces from models/Types
import { APILink } from "../const/linkAPI"; // Import API endpoint from const/linkAPI

//--------------------------------- Get Users (Admin) -------------------------------------------
export const getUsers = async (
  requestData: UserSearchRequest,
): Promise<UserSearchResponse> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const response = await axios.post(
      `${APILink}/api/users/search`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data: UserSearchResponse = response.data;
    return data;
  } catch (error: any) {
    throw error;
  }
};
//-----------------------------------------------------------------------------------------------

//------------------------------ Get User Detail (Admin) ----------------------------------------
export const getUserDetail = async (
  userId: string,
  token: string,
): Promise<UserData> => {
  try {
    const response = await axios.get(`${APILink}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData: UserData = response.data.data; // Assuming response structure matches UserData
    console.log(userData);

    if (userData) {
      return userData; // Return user data if successful
    } else {
      throw new Error("Failed to fetch user detail");
    }
  } catch (error: any) {
    console.error("Error fetching user detail:", error);
    throw error; // Throw error for handling in the component
  }
};
//-----------------------------------------------------------------------------------------------

//--------------------------------- Delete User (Admin) -----------------------------------------
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    await axios.delete(`${APILink}/api/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw error;
  }
};
//-----------------------------------------------------------------------------------------------

//-------------------------------- Register User (Public) ---------------------------------------
export const registerUser = async (
  userData: Partial<User["data"]>,
): Promise<User> => {
  try {
    const res = await axios.post<User>(`${APILink}/api/users`, userData);
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
//-----------------------------------------------------------------------------------------------

//-------------------------------- Update User (Admin) ---------------------------------------
export const updateUser = async (
  userId: string,
  updatedUserData: Partial<UserData>,
) => {
  try {
    const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage

    const response = await axios.put(
      `${APILink}/api/users/${userId}`, // API endpoint for updating user
      updatedUserData, // Data to send in the request body
      {
        headers: {
          "Content-Type": "application/json", // Set content-type header to JSON
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      },
    );

    const updatedUser: UserData = response.data.data; // Assuming response structure matches UserData
    console.log("Updated user:", updatedUser);

    return updatedUser; // Return updated user data if successful
  } catch (error: any) {
    if (error.response) {
      console.error("Update user failed", error.response.data); // Handle error if update fails
      console.error("Status", error.response.status);
      console.error("Headers", error.response.headers);
    } else if (error.request) {
      console.error("No response", error.request); // Handle error if no response
    } else {
      console.error("Fail", error.message); // Handle other errors
    }
    throw error; // Throw error for handling in the component
  }
};

//-----------------------------------------------------------------------------------------------

//-------------------------------- Update  User (Admin) ---------------------------------------

export const toggleUserStatus = async (
  user_id: string,
  status: boolean,
): Promise<void> => {
  const token = sessionStorage.getItem("token");
  const url = `${APILink}/api/users/change-status`;

  await axios.put(
    url,
    { user_id, status },
    {
      headers: {
        "Content-Type": "application/json", // Set content-type header to JSON
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
    },
  );
};

export const createUserAPI = async (userData: Partial<User["data"]>) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(`${APILink}/api/users/create`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
