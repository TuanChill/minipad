import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const navList = [
  {path: "/", title: "Trang chủ"},
  {path: "/app/pad", title: "Note Now"},
]

export default function LayoutAuth() {
  return (
    <div className="h-screen bg-pattern-1">
        <Header navList = {navList} />
        <Outlet/>
    </div>
  )
}
