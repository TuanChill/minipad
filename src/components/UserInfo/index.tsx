import { useAuth } from "../../hooks/useAuth";

export default function UserInfo() {
  const {user} = useAuth();

  return (
    <div className="flex items-center justify-between px-4 h-h_header item-sidebar_hover shadow-lg">
      <div className="flex">
        <span className="text-sm font-semibold flex items-center">{user?.displayName}</span>
        <img className="w-av_small rounded-full ml-2" src={user?.photoURL ?? ""} alt={user?.photoURL ?? ""} />
      </div>  
        <span className="cursor-pointer"><i className="ri-settings-3-line"></i></span>
    </div>
  )
}
