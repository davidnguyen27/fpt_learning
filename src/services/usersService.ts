import {
  User,
  UserData,
  UserSearchRequest,
  UserSearchResponse,
} from "../models/Types"; // Import types and interfaces from models/Types
import { APILink } from "../const/linkAPI"; // Import API endpoint from const/linkAPI
import axios from "axios";

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
    throw new Error(error.message);
  }
};

//-----------------------------------------------------------------------------------------------

//------------------------------ Get User Detail ------------------------------------------------
export const getUserDetail = async (userId: string, token: string) => {
  try {
    const response = await axios.get(`${APILink}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData: UserData = response.data.data;

    if (userData) {
      return userData;
    }
  } catch (error: any) {
    throw new Error(error.response.data.message);
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
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------

//----------------------------------Create User (Public)-----------------------------------------
export const createUser = async (userData: {
  name: string;
  password: string;
  email: string;
  role?: string;
}): Promise<UserData> => {
  try {
    const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage

    const response = await axios.post(`${APILink}/api/users/create`, userData, {
      headers: {
        "Content-Type": "application/json", // Set content-type header to JSON
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
    });

    const newUser: UserData = response.data.data; // Assuming response structure matches UserData
    console.log("Created user:", newUser);

    return newUser; // Return created user data if successful
  } catch (error: any) {
    if (error.response) {
      console.error("Create user failed", error.response.data); // Handle error if create fails
      console.error("Status", error.response.status);
      console.error("Headers", error.response.headers);
    } else if (error.request) {
      console.error("No response", error.request); // Handle error if no response
    } else {
      console.error("Fail", error.message); // Handle other errors
    }
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------

//---------------------------------Register User (Public)----------------------------------------
export const registerUser = async (userData: Partial<User["data"]>) => {
  try {
    const res = await axios.post<User>(`${APILink}/api/users`, userData);
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data)
      throw new Error(error.response.data.message);
  }
};
//--------------------------------------------------------------------------------------------

//-------------------------------- Update User -----------------------------------------------
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
    throw new Error(error.response.data.message);
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
    throw new Error(error.response.data.message);
  }
};

export const changeRoleAPI = async (
  userId: string,
  role: string,
): Promise<User> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.put(
      `${APILink}/api/users/change-role`,
      { user_id: userId, role: role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res.data.data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const reviewInstructorAPI = async (
  user_id: string,
  status: string,
  comment: string,
) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Token is not valid!");

    const res = await axios.put(
      `${APILink}/api/users/review-profile-instructor`,
      { user_id, status, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

export const changePasswordAPI = async (
  user_id: string,
  old_password: string,
  new_password: string,
) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Invalid token!");

    const res = await axios.put(
      `${APILink}/api/users/change-password`,
      { user_id, old_password, new_password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
