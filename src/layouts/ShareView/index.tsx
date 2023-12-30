import { Outlet } from "react-router-dom";

export default function ShareView() {
  return (
    <div className="h-screen overflow-y-scroll dlScrollbar">
        <Outlet />
    </div>
  )
}
