import { Navigate } from "react-router";
import { useAuthStore } from "../store/AuthStore";

const Protected = ({ children }) => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default Protected;
