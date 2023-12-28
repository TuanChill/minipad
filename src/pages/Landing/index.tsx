import About from "../../containers/SectionLanding/About";
import Intro from "../../containers/SectionLanding/Intro";
import SourceCode from "../../containers/SectionLanding/SourceCode";
import SectionScroll from "../../context/SectionScroll";
import Header from "../../layouts/components/Header";

const navList = [
  // { title: "Trang chủ", path: "/" },
  { title: "Giới thiệu", path: "/#intro" },
  { title: "Khám phá", path: "/#source-code" },
  { title: "Về chúng tôi", path: "/#about" },
  { title: "Ghi chú ngay", path: "/app/pad" },
  // { title: "Đăng ký", path: "/register" },
];

export default function LandingPage() {
  return (
    <div className="overflow-auto h-screen">
      <Header navList={navList} />
      <main className="pt-4 mb-5 mx-2 font-Montserrat">
        <SectionScroll>
          <Intro />
          <SourceCode />
          <About />
        </SectionScroll>
      </main>
    </div>
  );
}
