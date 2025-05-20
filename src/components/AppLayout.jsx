import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar";
import AdminHeader from "./admin/AdminHeader";

const AppLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");
    return (
      <div className="flex h-screen overflow-hidden">
         {isAdminRoute ? <AdminSidebar /> : <Sidebar />}
        <div className="flex flex-col flex-1">
        {isAdminRoute ? <AdminHeader /> : <Header />}
          {/* Nội dung có thể cuộn */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {children || <Outlet />}
          </div>
        </div>
      </div>
    );
};

export default AppLayout;
