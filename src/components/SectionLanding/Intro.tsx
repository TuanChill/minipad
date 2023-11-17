import { Button } from "../Button";
import "./index.css";

export default function Intro() {
  return (
    <section id="intro" className="border-b border-gray-300">
      <div className="text-center main-box">
        <div className="flex flex-col justify-around h-full">
          <div className="flex flex-col gap-6">
            <p className="title-section">
              <span className="text-pink-500">Ghi chú </span>
              những gì bạn cần
            </p>
            <p className="sm:w-[500px] mx-auto px-6">
              Giúp bạn ghi chú những bài học trên lớp của mình một cách hiệu quả
              nhất.
            </p>
            <Button
              iconRight={<i className="ri-arrow-right-line ml-1"></i>}
              text="Ghi chú ngay"
              className="w-fit mx-auto bg-slate-800 text-white px-3 py-2 font-semibold hover:bg-slate-700"
            />
          </div>
          <img className="items-end" src="src/assets/img/home-hero.webp" />
        </div>
      </div>
    </section>
  );
}
