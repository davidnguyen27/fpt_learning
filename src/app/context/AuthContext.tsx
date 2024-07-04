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

  // Sign In
  const login = async (email: string, password: string) => {
    try {
      console.log("Sign in with:", { email, password });

      const response = await axios.post(
        `${APILink}/api/auth`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Response from API:", response.data);

      // Check API response
      const token =
        response.data.token ||
        response.data.accessToken ||
        response.data.data?.token;
      console.log("Token from API response:", token);

      if (token) {
        console.log("Login successfully, token:", token);
        sessionStorage.setItem("token", token);

        // Call API GetCurrentLoginUser use token
        const userResponse = await axios.get(`${APILink}/api/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = userResponse.data;
        console.log("userData: ", userData);

        if (userData) {
          console.log("User data received successfully:", userData);
          setUser(userData);
          sessionStorage.setItem("user", JSON.stringify(userData));
          console.log("User data saved to sessionStorage:", userData);
        } else {
          console.log("Could not get user data.");
          throw new Error("Could not get user data");
        }
      } else {
        console.log("Invalid login information.");
        throw new Error("Invalid login information");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Loin failed", error.response.data);
        console.error("Status", error.response.status);
        console.error("Headers", error.response.headers);
      } else if (error.request) {
        console.error("No response received", error.request);
      } else {
        console.error("Fail", error.message);
      }
      throw error; // Throws an error to handle in the calling function
    }
  };

  // Log out
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
