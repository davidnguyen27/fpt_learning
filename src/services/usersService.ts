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
    console.log("Loading users with:", requestData);

    const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage

    const response = await axios.post(
      // Send a POST request to fetch users from the API
      `${APILink}/api/users/search`, // API endpoint
      requestData, // Data to send
      {
        headers: {
          "Content-Type": "application/json", // Set content-type header to JSON
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      },
    );

    const data: UserSearchResponse = response.data; // Get data from response

    console.log("Loading users successfully, users:", data);

    return data; // Return user data from the API
  } catch (error: any) {
    if (error.response) {
      console.error("Loading users fail.", error.response.data); // Handle error if response fails
      console.error("Status", error.response.status);
      console.error("Headers", error.response.headers);
    } else if (error.request) {
      console.error("Not response", error.request); // Handle error if no response
    } else {
      console.error("Fail", error.message); // Handle other errors
    }
    throw error; // Throw error for handling in the component
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
    console.log("Deleting user with id:", userId);

    const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage

    await axios.delete(`${APILink}/api/users/${userId}`, {
      headers: {
        "Content-Type": "application/json", // Set content-type header to JSON
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
    });

    console.log("Delete user successfully");
  } catch (error: any) {
    if (error.response) {
      console.error("Delete user failed", error.response.data); // Handle error if delete fails
      console.error("Status", error.response.status);
      console.error("Headers", error.response.headers);
    } else if (error.request) {
      console.error("Not response", error.request); // Handle error if no response
    } else {
      console.error("Fail", error.message); // Handle other errors
    }
    throw error; // Throw error for handling in the component
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
  userId: string,
  status: boolean,
): Promise<UserData> => {
  const response = await axios.put(`${APILink}/api/users/change-status`, {
    userId,
    status,
  });
  return response.data;
};
