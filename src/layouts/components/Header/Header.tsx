import { Button } from "../../../components/Button";
import InputControl from "../../../components/Controls/Input";

export default function Header() {
  return (
    <div className="flex justify-between py-2 px-4 shadow-md">
      <InputControl className="w-40" placeholder="Tiêu đề" />
      <Button className="mr-2" text="Đăng xuất" iconLeft={<i className="ri-logout-box-line mr-1"></i>} />
    </div>
  );
}
