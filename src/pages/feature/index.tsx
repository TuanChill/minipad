import Header from "../../layouts/components/Header.tsx";
import  "./index.css"

const navList = [
    {path: "/", title: "Trang chủ"},
    {path: "/app/pad", title: "Ghi chú"},
]


export  default  function Feature () {
    return (
        <div>
            <Header navList={navList} />
            <main className="wrapper">
                <h1>Yêu cầu tính năng</h1>
                <p>Diễn đàn phản hồi - Chúng tôi muốn nghe ý kiến, suy nghĩ và đề xuất của bạn. Vui lòng gửi phản hồi hoặc yêu cầu tính năng của bạn thông qua diễn đàn phản hồi của chúng tôi</p>
                <h1 className="mini">MiniPad</h1>
                <ul>
                    <li><b>Người dùng đăng ký:</b> Đăng ký tài khoản MIỄN PHÍ để bạn có thể lưu ghi chú của mình và đăng nhập lại từ bất cứ đâu để chỉnh sửa chúng</li>
                    <li><b>Người dùng đăng nhập:</b> Đăng nhập bằng email của người dùng tăng độ bảo mật</li>
                    <li>Dễ dàng lấy lại mật khẩu khi người dùng quên và được xác thực bởi email của người dùng </li>
                    <li>Người dùng có thể tự tạo một hồ sơ riêng cho cá nhân mình</li>
                    <li>Ghi chú đơn giản, dễ dàng</li>
                    <li>Sử dụng trình soạn thảo HTML mạnh mẽ để cải thiện ghi chú của bạn</li>
                </ul>
                <h1>Tại sao nên sử dụng MiniPad ???</h1>
                <ul>
                    <li>Lưu ghi chú và truy cập nó từ bất kỳ vị trí nào vào bất kỳ lúc nào</li>
                    <li>Tạo danh sách việc cần làm</li>
                    <li>Sử dụng MiniPad như một cuốn nhật ký hàng ngày để ghi lại các sự kiện trong ngày</li>
                    <li>Danh sách mua sắm của cửa hàng</li>
                    <li>Ghi chép lớp học</li>
                </ul>
                <h1>Thông tin thêm về cách sử dụng MiniPad - trình chỉnh sửa ghi chú trực tuyến miễn phí</h1>
                <p>MiniPad là một trình soạn thảo văn bản trực tuyến cung cấp cho người dùng web một công cụ đơn giản để ghi và chia sẻ ghi chú trực tuyến. Ghi chú của người dùng được lưu thông qua kết nối internet an toàn đến máy chủ đám mây của chúng tôi. Minipad là miễn phí và có thể được truy cập từ mọi nơi vào bất kỳ lúc nào.</p>
                <h3>Quyền ghi chú</h3>
                <h3>Các loại ghi chú</h3>
                <h3>Tùy chọn chia sẻ ghi chú</h3>
                <h3>Sắp xếp ghi chú</h3>
                <p>Nếu bạn có bất kỳ câu hỏi nào hoặc bất kỳ ý tưởng nào khác về việc cải thiện MiniPad, vui lòng gửi email the địa chỉ() . Chúng tôi rất muốn ngeh ý kiến từ bạn!</p>
            </main>
        </div>
    )
}