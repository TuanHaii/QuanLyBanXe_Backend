# BE_QLBX API Postman Guide

Hướng dẫn nhanh để sử dụng Postman với backend BE_QLBX.

## 1. Cài đặt Postman

1. Tải và cài đặt Postman từ https://www.postman.com/
2. Mở Postman và tạo `Collection` mới nếu cần.

## 2. Base URL

- Local: `http://localhost:3000/api`
- Android emulator: `http://10.0.2.2:3000/api`

## 3. Thiết lập Authorization

1. Trên Postman, chọn tab `Authorization`.
2. Chọn `Type: Bearer Token`.
3. Điền token mẫu:

```text
mock-token-admin
```

4. Chọn `Save` để áp dụng cho request.

## 4. Ví dụ request

### 4.1 Login

- Method: `POST`
- URL: `http://localhost:3000/api/auth/login`
- Body: JSON

```json
{
  "email": "admin@mock.com",
  "password": "123456"
}
```

### 4.2 Get current user

- Method: `GET`
- URL: `http://localhost:3000/api/auth/me`
- Authorization: Bearer Token: `mock-token-admin`

### 4.3 Get mall products

- Method: `GET`
- URL: `http://localhost:3000/api/mall`
- Headers:
  - `Authorization: Bearer mock-token-admin`

### 4.4 Get sales list

- Method: `GET`
- URL: `http://localhost:3000/api/sales`
- Headers:
  - `Authorization: Bearer mock-token-admin`

### 4.5 List notifications

- Method: `GET`
- URL: `http://localhost:3000/api/notifications`
- Headers:
  - `Authorization: Bearer mock-token-admin`

## 5. Gợi ý tạo collection

1. Tạo `Collection` mới tên `BE_QLBX API`.
2. Thêm các request sau:
   - `Login`
   - `Get current user`
   - `Get cars`
   - `Create car`
   - `List mall products`
   - `List sales`
   - `List notifications`
   - `Get notification detail`
   - `List support requests`
3. Dùng `Environment` để đặt biến:
   - `baseUrl = http://localhost:3000/api`
   - `authToken = mock-token-admin`

Sau khi tạo xong, bạn có thể dùng `{{baseUrl}}/auth/me` và headers:

- `Authorization: Bearer {{authToken}}`
- `Content-Type: application/json`

## 6. Lưu ý

- Nếu backend chạy trên Android emulator, đổi `baseUrl` thành `http://10.0.2.2:3000/api`.
- Xem thêm chi tiết endpoint trong `docs/api-documentation.md`.
