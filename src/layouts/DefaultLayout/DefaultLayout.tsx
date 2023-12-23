import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import "./index.css";

export default function DefaultLayout() {
  return (
    <div>
      <div id="layoutSidenav">
        <SideBar />
        <div className="main">
          {/* <Header /> */}
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
