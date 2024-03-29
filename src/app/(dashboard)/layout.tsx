"use client";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React, { PropsWithChildren } from "react";
import { ReactFlowProvider } from "reactflow";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <ReactFlowProvider>
      <main className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </main>
    </ReactFlowProvider>
  );
};

export default DashboardLayout;
