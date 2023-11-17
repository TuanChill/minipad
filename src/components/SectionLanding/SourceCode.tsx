import { openInNewTab } from "../../utils";
import { Button } from "../Button";

export default function SourceCode() {
  return (
    <section
      id="intro"
      className="border-b border-gray-300 lg:h-[650px] bg-gray-50 py-16 flex flex-col justify-center"
    >
      <div className="text-center">
        <h2 className="title-section">
          Khám phá
          <span className="text-green-400"> Source Code</span>
        </h2>
        <article className="flex gap-5 max-w-[600px] mx-auto mt-16 shadow-2xl p-6 border rounded-lg">
          <img src="/public/Logo.png" alt="Logo Notion" className="w-[120px]" />
          <div className="text-left flex flex-col">
            <h3 className="text-xl font-bold mb-1">MiniPad</h3>
            <p className="text-gray-500">Ghi chú những gì bạn cần một cách đơn giản nhất!!</p>
            <Button
              className="w-fit justify-self-start mt-5"
              iconLeft={<i className="ri-github-fill mr-1"></i>}
              text="Source code"
              onClick={() => openInNewTab("https://github.com/TuanChill/notion--")}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
