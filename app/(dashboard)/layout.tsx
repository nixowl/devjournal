// TODO: Fix "any type" ts error

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
    return <div className="flex flex-col h-full w-full">
        <Header />
        <div className="w-full flex flex-1">
            <Sidebar />
            {children}
        </div>
        
    </div>;
};

export default DashboardLayout;
