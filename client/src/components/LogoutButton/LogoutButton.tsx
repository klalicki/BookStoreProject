import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const LogoutButton = () => {
  const { token, logout } = useContext(AuthContext);
  return token ? (
    <button
      onClick={() => {
        logout();
      }}
    >
      Logout
    </button>
  ) : null;
};
export default LogoutButton;
