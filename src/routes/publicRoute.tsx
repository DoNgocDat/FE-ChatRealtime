import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = !!sessionStorage.getItem("accessToken"); 

  return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
