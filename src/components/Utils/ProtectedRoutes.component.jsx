import { Navigate, Outlet } from "react-router-dom";
import PATHROUTES from "../../utils/PathRoutes";

const ProtectedRoutes = ({ userLogin }) => {

  if (!userLogin) {
    return <Navigate to={PATHROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;