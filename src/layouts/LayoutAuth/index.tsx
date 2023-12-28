import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const navList = [
  { path: "/", title: "Trang chủ" },
  { path: "/app/pad", title: "Ghi chú" },
];

export default function LayoutAuth() {
  return (
    <div className="h-screen bg-pattern-1">
      <Header navList={navList} />
      <div className="font-Montserrat">
        <Outlet />
      </div>
    </div>
  );
}
