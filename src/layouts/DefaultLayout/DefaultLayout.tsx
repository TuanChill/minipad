import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import "./index.css";
import { useKey } from "../../hooks/useKey";

export default function DefaultLayout() {
  useKey('ctrls', () => {
    console.log('Ctrl+S fired!')
  });
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
