import { APILink } from "../const/linkAPI";
import axios from "axios";
import { User } from "../models/Types";

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    const response = await axios.post(
      `${APILink}/api/auth`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const token =
      response.data.token ||
      response.data.accessToken ||
      response.data.data?.token;

    if (token) {
      sessionStorage.setItem("token", token);
      return token;
    } else {
      throw new Error("Invalid information!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginViaGoogleAPI = async (
  credential: string,
): Promise<string> => {
  try {
    const res = await axios.post(
      `${APILink}/api/auth/google`,
      { google_id: credential },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const token =
      res.data.token || res.data.accessToken || res.data.data?.token;
    console.log(token);
    if (token) {
      sessionStorage.setItem("token", token);
      return token;
    } else {
      throw new Error("Invalid Google login response!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerViaGoogleAPI = async (
  credential: string,
): Promise<User["data"]> => {
  try {
    const res = await axios.post(
      `${APILink}/api/users/google`,
      { google_id: credential, role: "student" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const user = res.data;
    if (user) {
      sessionStorage.setItem("user", user);
      return user;
    } else {
      throw new Error("Invalid Google registration response!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCurrentLogin = async (token: string): Promise<User> => {
  try {
    const res = await axios.get(`${APILink}/api/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = res.data;
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    } else {
      throw new Error("Cannot get user data!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyEmailAPI = async (token: string): Promise<boolean> => {
  try {
    const res = await axios.post(`${APILink}/api/auth/verify-token`, {
      token,
    });
    return res.data.success;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resendEmailAPI = async (email: string): Promise<boolean> => {
  try {
    const res = await axios.post(`${APILink}/api/auth/resend-token`, { email });
    return res.data.success;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const forgotPassAPI = async (email: string): Promise<boolean> => {
  try {
    const res = await axios.put(`${APILink}/api/auth/forgot-password`, {
      email,
    });
    return res.data.success;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Token notfound!");

    await axios.get(`${APILink}/api/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
  } catch (error: any) {
    throw new Error(error);
  }
};
