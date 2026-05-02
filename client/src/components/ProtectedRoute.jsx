import { Navigate ,useLocation} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
 
export function ProtectedRoute({ children }) {
  const { token } = useAuth();
 if (token) {
  return children;
}
return <Navigate to="/login" replace />;
}