import { createContext, useState, useContext } from "react";
import { signin, signup, logout } from "../services/AuthService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const handleSignup = async (data) => {
    await signup(data); // backend returns message
    return "Signup success, now signin.";
  };

  const handleSignin = async (data) => {
    const res = await signin(data);
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
  };

  const handleLogout = async () => {
    await logout();
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, handleSignup, handleSignin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
