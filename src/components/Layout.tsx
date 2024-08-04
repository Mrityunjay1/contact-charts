import { SidebarProvider } from "../context/SidebarContext";
import { PageHeader } from "./PageHeader";

import { Sidebar } from "./Sidebar";

const Layout = ({ children }: any) => {
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />

        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <Sidebar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
