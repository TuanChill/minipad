import { Outlet } from "react-router-dom";
import "./index.css";
import React from "react";

export default function Pad() {
  return (
    <React.Fragment>
      <Outlet />
      {/* <PadEditor /> */}
    </React.Fragment>
  );
}
