# BE_QLBX API Reference

Backend hiện hỗ trợ các endpoint mà FE có thể sử dụng để kết nối với ứng dụng mobile.

## Base URL

- `http://localhost:3000/api`
- Nếu chạy FE trên Android emulator thì cấu hình FE dùng: `http://10.0.2.2:3000/api`

## Auth / User

| Phương thức | Đường dẫn | Auth | Body | Mô tả |
|---|---|---|---|---|
| POST | `/api/auth/login` | No | `{ email, password }` | Đăng nhập |
| POST | `/api/auth/register` | No | `{ name, email, password, phone }` | Đăng ký |
| POST | `/api/auth/logout` | Yes | - | Đăng xuất |
| POST | `/api/auth/forgot-password` | No | `{ email }` | Quên mật khẩu |
| POST | `/api/auth/reset-password` | No | `{ token, password }` | Reset mật khẩu |
| GET | `/api/auth/me` | Yes | - | Lấy thông tin hiện tại |
| GET | `/api/auth/profile` | Yes | - | Lấy profile |
| PUT | `/api/auth/profile` | Yes | `{ name?, phone?, avatar? }` | Cập nhật profile |
| GET | `/api/auth/settings` | Yes | - | Lấy cài đặt |
| PUT | `/api/auth/settings` | Yes | `{ dark_mode?, follow_system? }` | Cập nhật cài đặt |

## Cars

| Phương thức | Đường dẫn | Auth | Body / Query | Mô tả |
|---|---|---|---|---|
| GET | `/api/cars` | Yes | - | Lấy danh sách xe |
| GET | `/api/cars/{id}` | Yes | - | Lấy chi tiết xe |
| POST | `/api/cars` | Yes | `{ name, brand, model, year, color, price, mileage?, description?, fuel_type?, transmission?, status?, images? }` | Thêm xe |
| PUT | `/api/cars/{id}` | Yes | `{ ...fields... }` | Cập nhật xe |
| DELETE | `/api/cars/{id}` | Yes | - | Xóa xe |

## Mall

| Phương thức | Đường dẫn | Auth | Query | Mô tả |
|---|---|---|---|---|
| GET | `/api/mall` | Yes | `category`, `query` | Lấy sản phẩm mall |

## Sales

| Phương thức | Đường dẫn | Auth | Query | Mô tả |
|---|---|---|---|---|
| GET | `/api/sales` | Yes | `status`, `query` | Lấy danh sách sales |
| GET | `/api/sales/{id}` | Yes | - | Lấy chi tiết sales |

## Notifications

| Phương thức | Đường dẫn | Auth | Query | Mô tả |
|---|---|---|---|---|
| GET | `/api/notifications` | Yes | `category`, `is_read` | Lấy danh sách thông báo |
| GET | `/api/notifications/count` | Yes | `is_read` | Lấy số lượng thông báo |
| GET | `/api/notifications/{id}` | Yes | - | Lấy chi tiết thông báo |
| PUT | `/api/notifications/{id}/read` | Yes | - | Đánh dấu đã đọc |

## History

| Phương thức | Đường dẫn | Auth | Query | Mô tả |
|---|---|---|---|---|
| GET | `/api/history` | Yes | `query` | Lấy lịch sử |

## Dashboard

| Phương thức | Đường dẫn | Auth | - | Mô tả |
|---|---|---|---|---|
| GET | `/api/dashboard/summary` | Yes | - | Lấy tổng quan dashboard |

## Reports

| Phương thức | Đường dẫn | Auth | - | Mô tả |
|---|---|---|---|---|
| GET | `/api/reports` | Yes | - | Lấy báo cáo tổng quan |
| GET | `/api/reports/goals` | Yes | - | Lấy mục tiêu báo cáo |

## Support

| Phương thức | Đường dẫn | Auth | Body / Query | Mô tả |
|---|---|---|---|---|
| GET | `/api/support` | No | - | Lấy danh sách mục hỗ trợ |
| POST | `/api/support/contact` | Yes | `{ name, email, message }` | Gửi yêu cầu hỗ trợ |
| GET | `/api/support/requests` | Yes | `status` | Lấy yêu cầu hỗ trợ của user |
| GET | `/api/support/requests/{id}` | Yes | - | Chi tiết yêu cầu hỗ trợ |

## Response chung

Backend trả về JSON dạng sau:

```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

với các endpoint auth login/register/update profile còn trả thêm dữ liệu ngay ở root:

```json
{
  "success": true,
  "message": "...",
  "token": "...",
  "user": { ... },
  "data": { ... }
}
```

## Chú ý cho FE

- FE hiện dùng base URL `http://10.0.2.2:3000/api` cho Android emulator.
- Header auth: `Authorization: Bearer <token>`.
- User demo backend hiện có thể sử dụng `admin@mock.com / 123456` cùng `mock-token-admin` nếu FE cần mock token.
