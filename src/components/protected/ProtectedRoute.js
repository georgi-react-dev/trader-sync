import { Navigate, useLocation } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const location = useLocation();

  if (!token) {
    return <Navigate to="/autentication" replace state={{ from: location }} />;
  }

  return children;
};
export default ProtectedRoute;
