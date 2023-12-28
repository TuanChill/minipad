import Header from "../../layouts/components/Header.tsx";
import "./index.css"
import "./index.css"
const navList = [
    {path: "/", title: "Trang chủ"},
    {path: "/app/pad", title: "Ghi chú"},
]


export  default  function Donate () {
    return (
        <div>
            <Header navList={navList} />
            <main className="mt-[70px]">
            <section>
          <h2>Thông tin đóng góp</h2>
          <form>
            <div>
              <label htmlFor="FullName">Họ và tên:</label>
              <input type="text" id="FullName" name="FullName" required />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div>
              <label htmlFor="amount">Số tiền:</label>
              <input type="number" id="amount" name="amount" required />
            </div>

            <div>
              <label htmlFor="paymentMethod">Phương thức thanh toán:</label>
              <select id="paymentMethod" name="paymentMethod" required>
                <option value="creditCard">Thẻ tín dụng</option>
                <option value="paypal">PayPal</option>
                <option value="bankTransfer">Chuyển khoản ngân hàng</option>
              </select>
            </div>

            <div>
              <label htmlFor="communicationMethod">Phương thức liên lạc:</label>
              <select
                id="communicationMethod"
                name="communicationMethod"
                required
              >
                <option value="email">Email</option>
                <option value="phone">Điện thoại</option>
                <option value="mail">Thư tín</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div>
              <label htmlFor="message">Thông điệp:</label>
              <textarea id="message" name="message"></textarea>
            </div>

            <button type="submit">Quyên góp</button>
          </form>
        </section>
      </main>

      <footer>
        <p>
          &copy; 2022 Tổ chức của bạn. Đã đăng ký bản quyền. Liên hệ chúng tôi tại{" "}
          <a href="https://www.facebook.com">Facebook</a>,{" "}
          <a href="https://www.instagram.com">Instagram</a>,{" "}
          <a href="https://www.twitter.com">Twitter</a>.
        </p>
      </footer>
      <img src="ảnh.jpg" alt="Hình ảnh tượng trưng cho đóng góp" className="ảnh" />
    </div>
  );
}
           
