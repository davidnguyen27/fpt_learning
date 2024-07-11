import axios from "axios";
import {
  User,
  UserData,
  UserSearchRequest,
  UserSearchResponse,
} from "../models/Types"; // Import types and interfaces from models/Types
import { APILink } from "../const/linkAPI"; // Import API endpoint from const/linkAPI

//--------------------------------- Get Users (Admin) ------------------------------------------
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
    throw new Error(error);
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
//--------------------------------------------------------------------------------------------

//-------------------------------- Update User (Admin) ---------------------------------------
export const updateUser = async (
  userId: string,
  updatedUserData: Partial<UserData>,
) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const response = await axios.put(
      `${APILink}/api/users/${userId}`,
      updatedUserData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const updatedUser: UserData = response.data.data;
    return updatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

//---------------------------------------------------------------------------------------------

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
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const createUserAPI = async (userData: Partial<User["data"]>) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    console.log("Sending user data to create:", userData);

    const res = await axios.post(`${APILink}/api/users/create`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("User created successfully:", res.data.data);
    return res.data.data;
  } catch (error: any) {
    throw new Error("Failed to create user");
  }
};
