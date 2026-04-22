# BE_QLBX Backend API

Backend BE_QLBX đã được điều chỉnh cho phù hợp với frontend `QuanLyBanXe`.

## Tổng quan

- Backend: Node.js + Express
- Entry point: `server.js`
- Base API: `http://localhost:3000/api`
- FE Android emulator nên dùng: `http://10.0.2.2:3000/api`
- Tài liệu API:
  - `docs/api-schema.yaml`
  - `docs/API_REFERENCE.md`
  - `docs/api-documentation.md`
  - `docs/api-documentation.txt`
  - `docs/api-documentation-summary.md`
  - `docs/api-documentation-quickstart.md`
  - `docs/api-documentation-curl.md`
  - `docs/api-documentation-postman.md`
  - `docs/api-documentation-postman.json`
  - `docs/api-documentation-postman-environment.json`

## Cài đặt và chạy

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
