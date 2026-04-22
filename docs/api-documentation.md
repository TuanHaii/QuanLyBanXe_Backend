# BE_QLBX API Documentation

Tài liệu này mô tả chi tiết các endpoint backend hiện có trong `BE_QLBX` để FE `QuanLyBanXe` có thể gọi.

## 1. Tổng quan

- Base URL:
  - Local: `http://localhost:3000/api`
  - Android emulator: `http://10.0.2.2:3000/api`
- Auth header:
  - `Authorization: Bearer <token>`
- Response chung:

```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

- Auth login/register/update profile trả thêm:

```json
{
  "success": true,
  "message": "...",
  "token": "...",
  "user": { ... },
  "data": { ... }
}
```

- Mock user hiện có:
  - Email: `admin@mock.com`
  - Password: `123456`
  - Token: `mock-token-admin`

## 2. Authentication / User

### 2.1 POST `/api/auth/login`

Request body:

```json
{
  "email": "admin@mock.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "token": "mock-token-admin",
  "user": {
    "id": "admin-001",
    "name": "Admin Demo",
    "email": "admin@mock.com",
    "phone": "0987654321",
    "role": "admin",
    "avatar": null,
    "preferences": {
      "dark_mode": true,
      "follow_system": true
    },
    "created_at": "...",
    "updated_at": "..."
  },
  "data": { ... }
}
```

### 2.2 POST `/api/auth/register`

Request body:

```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "123456",
  "phone": "0901234567"
}
```

Response giống cấu trúc login.

### 2.3 POST `/api/auth/logout`

- Auth: yes
- Body: none

Response:

```json
{
  "success": true,
  "message": "Đăng xuất thành công",
  "data": null
}
```

### 2.4 POST `/api/auth/forgot-password`

Request body:

```json
{
  "email": "user@example.com"
}
```

Response:

```json
{
  "success": true,
  "message": "Yêu cầu đặt lại mật khẩu đã được gửi",
  "data": null
}
```

### 2.5 POST `/api/auth/reset-password`

Request body:

```json
{
  "token": "abc123",
  "password": "newpassword"
}
```

Response:

```json
{
  "success": true,
  "message": "Mật khẩu đã được cập nhật",
  "data": null
}
```

### 2.6 GET `/api/auth/me`

- Auth: yes
- Response: thông tin user hiện tại.

### 2.7 GET `/api/auth/profile`

- Auth: yes
- Response:

```json
{
  "success": true,
  "message": "Thông tin người dùng",
  "data": { ... }
}
```

### 2.8 PUT `/api/auth/profile`

Request body:

```json
{
  "name": "Nguyễn Văn A",
  "phone": "0901234567",
  "avatar": "https://..."
}
```

Response: dữ liệu user đã cập nhật.

### 2.9 GET `/api/auth/settings`

- Auth: yes
- Response ví dụ:

```json
{
  "success": true,
  "message": "Cài đặt người dùng",
  "preferences": {
    "dark_mode": true,
    "follow_system": true
  },
  "data": {
    "preferences": {
      "dark_mode": true,
      "follow_system": true
    }
  }
}
```

### 2.10 PUT `/api/auth/settings`

Request body:

```json
{
  "dark_mode": false,
  "follow_system": true
}
```

Response: cài đặt mới.

## 3. Cars

### 3.1 GET `/api/cars`

- Auth: yes
- Response:

```json
{
  "success": true,
  "message": "Danh sách xe",
  "data": [
    {
      "id": "car-001",
      "name": "Toyota Camry 2024",
      "brand": "Toyota",
      "model": "Camry",
      "year": 2024,
      "color": "Đen",
      "price": 1250000000,
      "mileage": 0,
      "description": "...",
      "fuel_type": "Xăng",
      "transmission": "Tự động",
      "status": "available",
      "images": ["..."],
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

### 3.2 GET `/api/cars/{id}`

- Auth: yes
- Response: chi tiết xe.

### 3.3 POST `/api/cars`

Request body:

```json
{
  "name": "Honda Civic 2023",
  "brand": "Honda",
  "model": "Civic",
  "year": 2023,
  "color": "Trắng",
  "price": 870000000,
  "mileage": 5000,
  "description": "...",
  "fuel_type": "Xăng",
  "transmission": "Tự động",
  "status": "available",
  "images": ["https://..."]
}
```

Response: xe mới.

### 3.4 PUT `/api/cars/{id}`

Request body có thể chứa bất kỳ trường xe nào cần cập nhật.

### 3.5 DELETE `/api/cars/{id}`

- Auth: yes
- Response: xác nhận xoá.

## 4. Mall

### GET `/api/mall`

- Auth: yes
- Query params:
  - `category` (tùy chọn)
  - `query` (tùy chọn)

Response: danh sách sản phẩm mall.

## 5. Sales

### 5.1 GET `/api/sales`

- Auth: yes
- Query params:
  - `status` (pending/completed/cancelled)
  - `query`

### 5.2 GET `/api/sales/{id}`

- Auth: yes
- Response: chi tiết sale.

## 6. Notifications

### 6.1 GET `/api/notifications`

- Auth: yes
- Query params:
  - `category`
  - `is_read`

### 6.2 GET `/api/notifications/count`

- Auth: yes
- Query params:
  - `is_read`

### 6.3 GET `/api/notifications/{id}`

- Auth: yes
- Response: chi tiết thông báo.

### 6.4 PUT `/api/notifications/{id}/read`

- Auth: yes
- Response: thông báo đã cập nhật `is_read`.

## 7. History

### GET `/api/history`

- Auth: yes
- Query params:
  - `query`

## 8. Dashboard

### GET `/api/dashboard/summary`

- Auth: yes
- Response: tổng quan dashboard.

## 9. Reports

### GET `/api/reports`

- Auth: yes
- Response: báo cáo tổng quan.

### GET `/api/reports/goals`

- Auth: yes
- Response: mục tiêu báo cáo.

## 10. Support

### 10.1 GET `/api/support`

- Auth: no
- Response: danh sách mục hỗ trợ.

### 10.2 POST `/api/support/contact`

- Auth: yes
- Body:

```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "message": "Tôi cần hỗ trợ..."
}
```

### 10.3 GET `/api/support/requests`

- Auth: yes
- Query params:
  - `status`

### 10.4 GET `/api/support/requests/{id}`

- Auth: yes
- Response: chi tiết yêu cầu hỗ trợ.

## 11. Notes

- Nếu backend không kết nối được PostgreSQL, server vẫn khởi động bằng mock data.
- Đảm bảo FE gửi Header `Authorization` khi gọi route yêu cầu auth.
- Khi FE chạy Android emulator, dùng `10.0.2.2` để truy cập backend local.
