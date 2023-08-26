import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

export default function DefaultLayout() {
  return (
    <div>
      <Header />
      <div id="layoutSidenav">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
