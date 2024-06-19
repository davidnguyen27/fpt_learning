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
      const response = await axios.get<User[]>(
        "https://665fc1c95425580055b0bf26.mockapi.io/users",
      );
      const users = response.data;
      console.log(users);
      const userData = users.find(
        (user) => user.email === email && user.password === password,
      );
      console.log(userData);

      if (userData) {
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
