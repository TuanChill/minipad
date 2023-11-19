import { Link } from "react-router-dom";

const authors = [
  {
    name: "Lương Ngọc Tuấn",
    avatar: "/authors/tuan.jpg",
    position: "Nhóm trưởng",
    profile: "https://github.com/TuanChill"
  },
  {
    name: "Trương Thị Lan Anh",
    avatar: "/authors/lanh.jpg",
    position: "Thành viên",
    profile: "https://www.facebook.com/lananh.truongthi.1401?mibextid=LQQJ4d"
  },
  {
    name: "Vũ Thị Ánh Ngọc",
    avatar: "/authors/ngoc.jpg",
    position: "Thành viên",
    profile: "https://www.facebook.com/profile.php?id=100020801284969&mibextid=LQQJ4d"
  },
  {
    name: "Nguyễn Kim Vui",
    avatar: "/authors/vui.jpg",
    position: "Thành viên",
    profile: "https://www.facebook.com/hari.yorokobi?mibextid=LQQJ4d"
  },
];

export default function About() {
  return (
    <section id="about" className="border-b border-gray-300 py-16">
      <div className="text-center flex flex-col gap-6">
        <h2 className="title-section">
          Nhóm
          <span className="text-blue-500"> Tác giả</span>
        </h2>
        <p>Nhóm đã xây dựng một website nhằm giúp cho việc ghi chú trở nên dễ dàng hơn. <br />Cảm ơn bạn đã ủng hộ, nhóm rất hy vọng nó có ích cho bạn trong công việc !</p>
        <div className="flex gap-8 mx-auto mt-10 flex-wrap justify-center mb-8">
          {authors.map((e) => {
            return (
              <Link key={e.name} target="_blank" to={e.profile} className="flex flex-col items-center">
                <img className="w-[100px] h-[100px] rounded-full border-4 shadow-md shadow-gray-400 overflow-hidden hover:opacity-75" src={e.avatar} alt={e.name} />
                <p className="font-semibold mt-5">{e.name}</p>
                <p className="text-gray-500">{e.position}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
