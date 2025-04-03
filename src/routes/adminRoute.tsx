import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.role === "admin"; // Kiểm tra role của user

  return isAdmin ? <Outlet /> : <Navigate to="/notfound" />;
};

export default AdminRoute;
