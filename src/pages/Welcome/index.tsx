import Header from "../../layouts/components/Header.tsx";
import "./index.css";

const navList = [
  { path: "/", title: "Trang chủ" },
  { path: "/app/pad", title: "Ghi chú" },
];

export default function Welcome() {
  return (
    <div>
      <Header navList={navList} />
      <main className="mt-[70px]">
        <div>
          <img
            className="center"
            src="https://mini-pad.vercel.app/Logo.png"
            alt="logo"
          />
          <p className="tieude">
            Chào mừng bạn đến với MiniPad Online! <br />
            <span>
              MiniPad là sổ tay kỹ thuật số cá nhân của bạn. Tạo nội dung, sắp
              xếp công việc và cộng tác với những người khác.
            </span>
            <br />
            <span className="purple">
              Giúp chúng tôi tùy chỉnh sổ tay của bạn. Bạn là ai?
            </span>
          </p>
          <button className="background">Giáo viên</button>
          <button className="background">Sinh viên</button>
          <p>Không, cảm ơn, chỉ cần cung cấp cho tôi sổ tay trống</p>
        </div>
      </main>
    </div>
  );
}
