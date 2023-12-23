import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function UserInfo() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const openProfile = () => {
    navigate("/profile-setting");
  };

  const logout = () => {
    navigate("/logout")
  }

  return (
    <div className="flex items-center justify-between px-4 h-h_header bg-slate-100 absolute bottom-0 z-40 w-full">
      <div className="flex items-center cursor-pointer" onClick={openProfile}>
        <img
          className="w-[30px] h-[30px] rounded-full mr-2 "
          src={user?.photoURL ?? ""}
          alt={user?.photoURL ?? ""}
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold flex items-center">
            {user?.displayName}
          </span>
          <span className="text-xs text-gray-500">Xem Profile</span>
        </div>
      </div>
      <button onClick={logout}>
        <i className="ri-logout-box-r-line text-lg"></i>
      </button>
    </div>
  );
}
