# BE_QLBX Backend Structure

Cấu trúc backend được tạo theo dạng chung để phục vụ phát triển API cho dự án `QuanLyBanXe`.

## Tai lieu API cho mobile

- Xem tai: `docs/mobile-api-endpoints.md`

Thư mục chính:

- `src/`
  - `controllers/` - xử lý logic request/response
  - `models/` - định nghĩa entity / schema dữ liệu
  - `routes/` - định nghĩa tuyến đường API
  - `services/` - business logic và thao tác dữ liệu
  - `middlewares/` - middleware như xác thực, logging, validation
  - `utils/` - hàm tiện ích dùng chung
- `config/` - cấu hình ứng dụng, môi trường, database
- `database/`
  - `migrations/` - các file migration
  - `seeders/` - dữ liệu mẫu
- `tests/` - unit/integration tests
- `docs/` - tài liệu kỹ thuật
- `scripts/` - scripts hỗ trợ chạy, deploy, migrate
- `public/` - tài nguyên tĩnh nếu cần
- `logs/` - file log ứng dụng
## Cách chạy backend

1. Tạo file `.env` ở thư mục `BE_QLBX/` nếu chưa có.
2. Cài dependencies:

```bash
npm install
```

3. Chạy server:

```bash
npm run dev
```

4. Mở API:

- `http://localhost:3000/`
- `http://localhost:3000/api/health`
- `http://localhost:3000/api/example`

## Test backend độc lập

Bạn có thể kiểm tra backend mà không cần sửa frontend bằng `curl`, Postman, Insomnia hoặc HTTP client khác.

Ví dụ:

```bash
curl http://localhost:3000/api/health
```

Đăng ký user:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Password123!","phone":"0987654321"}'
```

Đăng nhập:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123!"}'
```

Sử dụng token để gọi endpoint bảo mật:

```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:3000/api/auth/profile
```

> Lưu ý: `POST /api/auth/forgot-password` hiện trả về `resetToken` trong response để test nhanh. Trong thực tế bạn có thể gửi token này vào email.

## Endpoint hiện tại

Backend hiện hỗ trợ các API cho các giao diện sau:

- Authentication / User profile:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/profile`
  - `PUT /api/auth/profile`
  - `POST /api/auth/forgot-password`
  - `POST /api/auth/reset-password`
- Car management:
  - `GET /api/cars`
  - `GET /api/cars/:id`
  - `POST /api/cars`
  - `PUT /api/cars/:id`
  - `DELETE /api/cars/:id`
- Mall / Product discovery:
  - `GET /api/mall?category=Sedan&query=toyota`
- Sales:
  - `GET /api/sales`
  - `GET /api/sales/:id`
  - `POST /api/sales`
  - `PUT /api/sales/:id`
  - `DELETE /api/sales/:id`

Backend hiện phù hợp với giao diện đăng nhập, đăng ký, profile, reset password, quản lý xe, Mall và Sales trong app Flutter.

## Ghi chú

- Backend hiện dùng Node.js, Express và PostgreSQL.
- `config/db.js` kết nối PostgreSQL qua `process.env.DATABASE_URL`.
- File `.env` không nên commit vì chứa secret.
Bạn có thể mở rộng cấu trúc này với công nghệ cụ thể (Node.js, Python, Java, v.v.) theo nhu cầu dự án.