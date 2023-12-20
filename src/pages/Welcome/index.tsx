import Header from "../../layouts/components/Header.tsx";
import  "./index.css"

const navList = [
    {path: "/", title: "Trang chủ"},
    {path: "/app/pad", title: "Ghi chú"},
]


export  default  function Welcome () {
    return (
        <div>
            <Header navList={navList} />
            <main className="mt-[70px]">
                Lanh
            </main>
        </div>
    )
}