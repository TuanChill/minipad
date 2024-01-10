export default function Donate() {
  return (
    <div className="py-16 text-center border-b border-gray-300">
      <h3 className="title-section">Ủng hộ tôi cốc cà phê... :&gt;</h3>
      <p className="mt-4">Cảm ơn bạn đã quan tâm</p>
      <p className="mt-2">
        Nếu thấy web hay hoặc thương xót có thể ủng hộ tác giả
      </p>
      <div className="flex flex-col items-center mt-6">
        <img
          className="max-w-[250px]"
          src="/donate.jpg"
          alt="momo"
        />
        <a className="mt-2 text-blue-500 underline" href="https://me.momo.vn/G9IwTNsRuVC3C9u2CeiyIb">Momo</a>
      </div>
    </div>
  );
}
