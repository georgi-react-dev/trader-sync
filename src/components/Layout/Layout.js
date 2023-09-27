import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div id="detail">
      <Outlet />
    </div>
  );
}

export default Layout;
