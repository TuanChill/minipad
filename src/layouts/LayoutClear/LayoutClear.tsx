import { Outlet } from "react-router-dom";

export default function LayoutClear() {
  return (
    <div className="mx-2">
        <Outlet/>
    </div>
  )
}
