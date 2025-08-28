import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../store/AuthStore";

const Protected = ({ children, role }) => {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/signin?redirect_url=${redirectUrl}`} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;
