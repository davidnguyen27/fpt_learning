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
      sessionStorage.setItem("token", token);

      const userData = await getCurrentLogin(token);
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  // Log out
  const logout = async () => {
    await authServiceLogout();
    setUser(null);
  };

  const getRole = () => {
    return user?.data.role || null;
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, getRole }}>
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
