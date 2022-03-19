import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("loginToken"));
  const [token, setToken] = useState(localStorageToken && localStorage.token);
  const [signinData, setSigningData] = useState({
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  });

  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", signinData);
      localStorage.setItem(
        "loginToken",
        JSON.stringify({ token: data.encodedToken })
      );
      setToken(data.encodedToken);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    setTimeout(() => {
      localStorage.removeItem("loginToken");
      setToken("");
      navigate("/");
    }, 1000);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, loginHandler, signinData, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthContextProvider };
