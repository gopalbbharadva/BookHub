import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const checkLoginService = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    !token && navigate("/login");
  });
};

export { checkLoginService };
