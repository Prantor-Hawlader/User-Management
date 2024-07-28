import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import dataFetch from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signup = async (name, email, password) => {
    try {
      const response = await dataFetch.post("/auth/register", {
        name,
        email,
        password,
      });
      setCurrentUser(response.data);
      setError(null);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Account creation has been failed");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await dataFetch.post("/auth/login", { email, password });
      setCurrentUser(response.data);
      localStorage.setItem("token", response.data.token);
      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Validate token and get user info
          const response = await dataFetch.get("/auth/me", {
            headers: { Authorization: token },
          });
          setCurrentUser(response.data);
        } catch (error) {
          console.log("Intentionally logout", error);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [logout]);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
