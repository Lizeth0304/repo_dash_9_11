import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export const MainLayaout = () => {
  return (
    <div className="flex">
      <div className="w-[25%]">
        <Sidebar />
      </div>
      <div className="w-[100%]">
        <Header />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

