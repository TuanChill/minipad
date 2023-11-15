import Header from "../../layouts/components/Header";

const navList =  [
  {title: "Trang chủ", path: "/"},
  {title: "Giới thiệu", path: "/about"},
  {title: "Ghi chú ngay", path: "/app/pad"},
]


export default function LandingPage() {
  return (
    <div>
      <Header navList={navList} />
        <main>
      LandingPage
        </main>

    </div>
  )
}
