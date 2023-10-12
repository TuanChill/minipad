import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import InputControl from "../../../components/Controls/Input";

export default function Header() {
  const navigate = useNavigate();
  const signOut = () => {
    navigate("/logout");    
  }
  return (
    <div className="flex justify-between py-2 px-4 shadow-md absolute top-0 left-0 right-0 z-20 bg-slate-50">
      <InputControl className="w-40" placeholder="Tiêu đề" />
      <Button className="mr-2" text="Đăng xuất" iconLeft={<i className="ri-logout-box-line mr-1"></i>} onClick={signOut} />
    </div>
  );
}
