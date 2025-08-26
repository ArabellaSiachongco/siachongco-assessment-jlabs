import { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
  // always initialize the state to stay login
  const [token, setToken] = useState(localStorage.getItem("token"));

  // stay login
  const login = (t) => {
    localStorage.setItem("token", t);
    setToken(t);
  };
  
  // logout 
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
