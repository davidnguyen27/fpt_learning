import { createContext, useState, ReactNode, useContext } from "react";
import axios from "axios";
import { AuthContextType, User } from "../../models/Types";

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
        "https://api-ojt-hcm24-react06-group02.vercel.app/api/auth",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Header: ", response.headers);
      console.log("Phản hồi từ API:", response.data);

      const userData = response.data;

      if (userData) {
        console.log("Đăng nhập thành công:", userData);
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
      } else {
        console.log("Thông tin đăng nhập không hợp lệ.");
        throw new Error("Invalid credentials");
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
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
