import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PATHROUTES from "../../utils/PathRoutes";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
      } else {
        navigate(PATHROUTES.LOGIN, { replace: true });
      }
    }
  }, [user, navigate]);

  return !user ? null : <Outlet />;
};

export default ProtectedRoutes;


