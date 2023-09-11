import { PropsWithChildren } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props: PropsWithChildren) => {
  const { token } = useContext(AuthContext);
  if (token) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/" />;
  }
};
export default ProtectedRoute;
