import { createContext, useState, ReactNode, useContext } from "react";
import { AuthContextType, User } from "../../models/Types";
import {
  login as authServiceLogin,
  getCurrentLogin,
} from "../../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Sign In
  const login = async (email: string, password: string) => {
    const token = await authServiceLogin(email, password);
    const user = await getCurrentLogin(token);
    setUser(user);
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
