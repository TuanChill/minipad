import { Link } from "react-router-dom";
import Logo from "../../components/Logo";

interface NavItem {
    title: string;
    path: string;
}

interface IPropsHeader {
    navList: NavItem[];
    className?: string | null;
} 

export default function Header( {navList, className} : IPropsHeader) {
  return (
    <div className={`w-full bg-slate-50 flex items-center justify-between px-6 py-3 shadow-md ${className}`}>
      <Logo />
      <nav className="flex gap-4">
        {navList.map((e) => {
          return(
            <Link to={e.path} key={e.title} className="bg-slate-300 p-2 rounded-md font-semibold">
              {e.title}
            </Link>
          )
        })}
      </nav>
    </div>
  );
}
