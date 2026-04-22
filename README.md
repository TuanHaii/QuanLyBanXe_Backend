# BE_QLBX Backend Structure

Cấu trúc backend được tạo theo dạng chung để phục vụ phát triển API cho dự án `QuanLyBanXe`.

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
cd BE_QLBX
npm install
npm run dev
```

## File `.env` mẫu

Tạo file `.env` tại thư mục `BE_QLBX/` nếu chưa có:

```env
APP_PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/your_db_name
NODE_ENV=development
```

> Nếu bạn chỉ cần chạy backend mock để phát triển FE, backend hiện đã được điều chỉnh để khởi động ngay cả khi không thể kết nối PostgreSQL.

## Endpoint quan trọng cho FE

- `POST /api/auth/login`
- `POST /api/auth/register`
- `PUT /api/auth/profile`
- `GET /api/mall`
- `GET /api/sales`
- `GET /api/sales/{id}`

## Dữ liệu trả về

Backend trả về JSON chuẩn:

```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

Đối với auth login/register và update profile, backend cũng trả thêm:

```json
{
  "success": true,
  "message": "...",
  "token": "...",
  "user": { ... },
  "data": { ... }
}
```

## Ghi chú quan trọng

- `config/db.js` cấu hình kết nối PostgreSQL.
- Frontend FE đang dùng API local nên cần đảm bảo backend khởi động trước khi chạy app.
- Nếu FE chạy trên Android emulator, dùng `10.0.2.2` để ánh xạ tới máy chủ địa phương.
