import { APILink } from "../const/linkAPI";
import axios from "axios";
import { User } from "../models/Types";

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    console.log("Bắt đầu đăng nhập với:", { email, password });

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
      console.log("Đăng nhập thành công, token nhận được:", token);
      sessionStorage.setItem("token", token);
      return token;
    } else {
      console.log("Thông tin đăng nhập không hợp lệ.");
      throw new Error("Thông tin đăng nhập không hợp lệ");
    }
  } catch (error: any) {
    if (error.response) {
      console.error("Đăng nhập thất bại", error.response.data);
      console.error("Trạng thái", error.response.status);
      console.error("Headers", error.response.headers);
    } else if (error.request) {
      console.error("Không nhận được phản hồi", error.request);
    } else {
      console.error("Lỗi", error.message);
    }
    throw error;
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
      throw new Error("Không thể lấy dữ liệu người dùng");
    }
  } catch (error: any) {
    console.error("Error getting current login user:", error);
    throw error;
  }
};
