import SidebarWrapper from "@/components/sidebar-wrapper";
import React, { ReactNode } from "react";

const WrappedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarWrapper>
      <>{children}</>
    </SidebarWrapper>
  );
};

export default WrappedLayout;
