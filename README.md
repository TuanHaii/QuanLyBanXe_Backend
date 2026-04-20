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

## Ghi chú

- Backend hiện dùng Node.js, Express và PostgreSQL.
- `config/db.js` kết nối PostgreSQL qua `process.env.DATABASE_URL`.
- File `.env` không nên commit vì chứa secret.
Bạn có thể mở rộng cấu trúc này với công nghệ cụ thể (Node.js, Python, Java, v.v.) theo nhu cầu dự án.