import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../store/AuthStore";

const Protected = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    // Send current path as redirect_url param
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/signin?redirect_url=${redirectUrl}`} replace />;
  }

  return children;
};

export default Protected;
