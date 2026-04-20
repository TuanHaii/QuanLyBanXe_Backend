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

Bạn có thể mở rộng cấu trúc này với công nghệ cụ thể (Node.js, Python, Java, v.v.) theo nhu cầu dự án.