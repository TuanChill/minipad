import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function LayoutAuth() {
  return (
    <div className="h-screen bg-pattern-1">
        <Header/>
        <Outlet/>
    </div>
  )
}
