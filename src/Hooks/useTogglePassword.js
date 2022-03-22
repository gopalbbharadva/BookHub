import { useState } from "react";

const useTogglePassword = () => {
  const [passwordToggle, setPasswordToggle] = useState({
    type: "password",
    isEyeIcon: false,
  });

  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState({
    type: "password",
    isEyeIcon: false,
  });

  const checkPasswordView = () => {
    passwordToggle.isEyeIcon
      ? setPasswordToggle({
          isEyeIcon: false,
          type: "password",
        })
      : setPasswordToggle({ isEyeIcon: true, type: "text" });
  };

  const checkConfirmPasswordView = () => {
    confirmPasswordToggle.isEyeIcon
      ? setConfirmPasswordToggle({
          isEyeIcon: false,
          type: "password",
        })
      : setConfirmPasswordToggle({ isEyeIcon: true, type: "text" });
  };

  return {
    passwordToggle,
    confirmPasswordToggle,
    checkPasswordView,
    checkConfirmPasswordView,
  };
};

export { useTogglePassword };
