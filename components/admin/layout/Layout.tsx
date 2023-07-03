import Sidebar from "../sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: any) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="w-full md:pl-8 ">{children}</div>
            <ToastContainer limit={1} />
        </div>
    );
};

export default Layout;
