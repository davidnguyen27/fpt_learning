import { createContext, useState, ReactNode, useContext } from "react";
import { AuthContextType, User } from "../../models/Types";
import {
  login as authServiceLogin,
  getCurrentLogin,
  logout as authServiceLogout,
} from "../../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Sign In
  const login = async (email: string, password: string) => {
    try {
      const token = await authServiceLogin(email, password);
      sessionStorage.setItem("token", token); // Store token in sessionStorage

      const userData = await getCurrentLogin(token);
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData)); // Store user data in sessionStorage
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Propagate the error for handling in components
    }
  };

  // Log out
  const logout = async () => {
    await authServiceLogout();
    setUser(null);
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
