import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log({ AUTHUSER: user });
  const location = useLocation();

  if (!user) {
    return <Navigate to="/autentication" replace state={{ from: location }} />;
  }

  return children;
};
export default ProtectedRoute;
