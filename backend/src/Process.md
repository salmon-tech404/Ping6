Tóm tắt luồng xử lý giữa các thư mục và file:

1. Client gửi yêu cầu đến server.

2. Server.js nhận yêu cầu và chuyển tiếp tới routes.

3. Routes xác định route và chuyển yêu cầu tới controllers.

4. Middleware kiểm tra yêu cầu (ví dụ: xác thực JWT, kiểm tra quyền truy cập).

5. Controller xử lý logic nghiệp vụ (ví dụ: truy vấn cơ sở dữ liệu, kiểm tra thông tin người dùng).

6. Libs được sử dụng trong controllers hoặc middlewares để thực hiện các công việc tái sử dụng (ví dụ: tạo JWT, mã hóa mật khẩu).

=> Kết quả được trả về cho client từ controller thông qua routes.
