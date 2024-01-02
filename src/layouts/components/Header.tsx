import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import useWindowDimensions from "../../hooks/useWindowDemensions";
import Tippy from "@tippyjs/react";
import { useCurrentUser } from "../../hooks/useCurrentUser";

interface NavItem {
  title: string;
  path: string;
}

interface IPropsHeader {
  navList: NavItem[];
  className?: string | null;
}

export default function Header({ navList, className }: IPropsHeader) {
  const navigate = useNavigate();

  const user = useCurrentUser();
  const { width } = useWindowDimensions();
  return (
    <div
      className={`fixed top-0 w-full bg-slate-50 flex items-center justify-between px-6 py-3 shadow-md ${className}`}
    >
      <Logo />
      <div className="flex items-center">
        {width >= 750 ? (
          <nav className="flex gap-4">
            {navList.map((e) => {
              return (
                <Link
                  to={e.path}
                  key={e.title}
                  className="bg-slate-300 p-2 rounded-md font-semibold"
                >
                  {e.title}
                </Link>
              );
            })}
          </nav>
        ) : (
          <Link
            to={"/app/pad"}
            className="bg-slate-300 p-2 rounded-md font-semibold"
          >
            Ghi chú ngay
          </Link>
        )}
        {user && (
          <Tippy
            arrow={true}
            delay={100}
            interactive={true}
            placement="bottom-end"
            content={<div className="shadow-md flex flex-col gap-1 bg-white border rounded-md py-2 px-1 border-gray-200">
              <button className="hover:bg-slate-200 px-3 rounded-md" onClick={() => navigate("/profile-setting")}>Tài khoản</button>
              <button className="hover:bg-slate-200 px-3 rounded-md" onClick={() => navigate("/logout")}>Đăng xuất</button>
            </div>}
          >
            <div className="flex cursor-pointer" onClick={() => navigate("/profile-setting")}>
              <img
                className="w-[30px] h-[30px] ml-4 rounded-full"
                src={user.photoURL}
                alt={user.fullName}
              />
              <i className="ri-arrow-down-s-fill text-2xl"></i>
            </div>
          </Tippy>
        )}
      </div>
    </div>
  );
}
