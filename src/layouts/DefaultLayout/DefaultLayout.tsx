import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SideBar from "../components/Sidebar/SideBar";
import "./index.css";

export default function DefaultLayout() {
  return (
    <div>
      <div id="layoutSidenav">
        <SideBar />
        <div className="main">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
