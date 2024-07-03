import { createContext, useState, ReactNode, useContext } from "react";
import axios from "axios";
import { AuthContextType, User } from "../../models/Types";
import { APILink } from "../../const/linkAPI";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email: string, password: string) => {
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

      console.log("Phản hồi từ API:", response.data);

      // Kiểm tra cấu trúc phản hồi của API
      const token =
        response.data.token ||
        response.data.accessToken ||
        response.data.data?.token;
      console.log("Token từ phản hồi API:", token);

      if (token) {
        console.log("Đăng nhập thành công, token nhận được:", token);
        sessionStorage.setItem("token", token);

        // Gọi API GetCurrentLoginUser sử dụng token
        const userResponse = await axios.get(`${APILink}/api/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = userResponse.data;
        console.log("userData: ", userData);

        if (userData) {
          console.log("Dữ liệu người dùng nhận được thành công:", userData);
          setUser(userData);
          sessionStorage.setItem("user", JSON.stringify(userData));
          console.log("Dữ liệu người dùng lưu vào sessionStorage:", userData);
        } else {
          console.log("Không thể lấy dữ liệu người dùng.");
          throw new Error("Không thể lấy dữ liệu người dùng");
        }
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
      throw error; // Ném lỗi để xử lý ở hàm gọi
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
