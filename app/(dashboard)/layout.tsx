// TODO: Fix "any type" ts error

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
    return <div className="flex flex-row h-screen w-screen">
        <Sidebar />
        <div className="w-full h-full flex flex-col flex-1">
            <Header />
            {children}
        </div>
        
    </div>;
};

export default DashboardLayout;
