import { Link } from "react-router-dom";
import Logo from "../../components/Logo";

const navList = [
  {path: "/", title: "Trang chủ"},
  {path: "/app/pad", title: "Note Now"},
]

export default function Header() {
  return (
    <div className="w-full bg-slate-50 flex items-center justify-between px-6 py-3 shadow-md">
      <Logo />
      <nav className="flex gap-4">
        {navList.map((e) => {
          return(
            <Link to={e.path} key={e.title} className="bg-slate-300 p-2 rounded-md">
              {e.title}
            </Link>
          )
        })}
      </nav>
    </div>
  );
}
