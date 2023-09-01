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
  const email = useAuth();
  console.log({ AUTHUSER: email });
  const location = useLocation();

  if (!email) {
    return <Navigate to="/autentication" replace state={{ from: location }} />;
  }

  return children;
};
export default ProtectedRoute;
