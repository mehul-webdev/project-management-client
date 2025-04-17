import { axiosInstance } from "@/api";
import { HandleCheckUserLoggedIn } from "@/api/authentication";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set to true initially to handle loading state

  useEffect(() => {
    const checkAuthStatus = async () => {
      const data = await HandleCheckUserLoggedIn();
      if (data?.isLoggedIn) {
        setUser(data?.user);
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading to false after checking
    };

    checkAuthStatus();
  }, []);

  const login = async () => {
    // Perform login request...
    // After login, refresh auth state
    window.location.reload();
  };

  const logout = async () => {
    await axiosInstance.post("/authentication/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
