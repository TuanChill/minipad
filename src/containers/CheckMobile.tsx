import { Link, Outlet } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDemensions";
import Header from "../layouts/components/Header";

const navList = [{ path: "/", title: "Trang chủ" }];

export default function CheckMobile() {
  const { width } = useWindowDimensions();

  return width < 860 ? (
    <div>
      <Header navList={navList} />
      <div className="mt-[70px] text-center px-3">
        <h3 className="text-3xl font-bold capitalize pt-7">
          Thiết bị không được hỗ trợ
        </h3>
        <p className="mt-6">
          Vui lòng sử dụng laptop để sử dụng chức năng này một cách hoàn hảo
          nhất
        </p>
        <img
          className="max-w-full mt-10"
          src="https://firebasestorage.googleapis.com/v0/b/notion-6958d.appspot.com/o/7510722.jpg?alt=media&token=74a28c2b-c93c-4e49-adc4-f1eb6c0f2516"
          alt="Responsive multi device"
        />
        <p className="mt-6 font-semibold text-lg">
          Nếu có thắc mắc gì. Vui lòng liên hệ với chúng tôi
        </p>
        <Link
          to="/contact-us"
          className="inline-flex items-center mt-3 px-4 py-2 w-fit border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cần hỗ trợ
        </Link>
      </div>
    </div>
  ) : (
    <Outlet />
  );
}
