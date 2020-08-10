import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppShell = ({ children }) => {
  return (
    <div className="h-screen">
      <div>
        <Sidebar />
      </div>
      <div>
        <div>
          <Navbar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AppShell;
