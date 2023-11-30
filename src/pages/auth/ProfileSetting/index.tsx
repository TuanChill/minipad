import { useAuth } from "../../../hooks/useAuth";
import Header from "../../../layouts/components/Header";

const navList = [
  { path: "/", title: "Trang chủ" },
  { path: "/app/pad", title: "Ghi chú ngay" },
];

const defaultAvatar = "/defaultAvatar.jpg"

export default function ProfileSetting() {
  const {user} = useAuth();
  return (
    <div>
      <Header navList={navList} />
      <main className="mt-20 lg:mx-8 mx-1">
        <section>
          <img src={user?.photoURL || defaultAvatar} alt={user?.displayName || ""} />
          <div className=""></div>
        </section>
      </main>
    </div>
  );
}
