# BE_QLBX API Curl Examples

Tài liệu này chứa ví dụ `curl` cho các endpoint backend BE_QLBX.

## Base URL

- Local: `http://localhost:3000/api`
- Android emulator: `http://10.0.2.2:3000/api`

## 1. Authentication / User

### 1.1 Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mock.com",
    "password": "123456"
  }'
```

### 1.2 Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "password": "123456",
    "phone": "0901234567"
  }'
```

### 1.3 Logout

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer mock-token-admin"
```

### 1.4 Forgot password

```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

### 1.5 Reset password

```bash
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token":"abc123",
    "password":"newpassword"
  }'
```

### 1.6 Get current user

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer mock-token-admin"
```

### 1.7 Update profile

```bash
curl -X PUT http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer mock-token-admin" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Nguyễn Văn A",
    "phone":"0901234567"
  }'
```

### 1.8 Get settings

```bash
curl -X GET http://localhost:3000/api/auth/settings \
  -H "Authorization: Bearer mock-token-admin"
```

### 1.9 Update settings

```bash
curl -X PUT http://localhost:3000/api/auth/settings \
  -H "Authorization: Bearer mock-token-admin" \
  -H "Content-Type: application/json" \
  -d '{
    "dark_mode": false,
    "follow_system": true
  }'
```

## 2. Cars

### 2.1 List cars

```bash
curl -X GET http://localhost:3000/api/cars \
  -H "Authorization: Bearer mock-token-admin"
```

### 2.2 Get car detail

```bash
curl -X GET http://localhost:3000/api/cars/car-001 \
  -H "Authorization: Bearer mock-token-admin"
```

### 2.3 Create car

```bash
curl -X POST http://localhost:3000/api/cars \
  -H "Authorization: Bearer mock-token-admin" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Honda Civic 2023",
    "brand":"Honda",
    "model":"Civic",
    "year":2023,
    "color":"Trắng",
    "price":870000000,
    "mileage":5000,
    "status":"available"
  }'
```

### 2.4 Update car

```bash
curl -X PUT http://localhost:3000/api/cars/car-001 \
  -H "Authorization: Bearer mock-token-admin" \
  -H "Content-Type: application/json" \
  -d '{"price":1200000000}'
```

### 2.5 Delete car

```bash
curl -X DELETE http://localhost:3000/api/cars/car-001 \
  -H "Authorization: Bearer mock-token-admin"
```

## 3. Mall

### 3.1 List mall products

```bash
curl -X GET "http://localhost:3000/api/mall?category=Xe%20m%E1%BB%9Bi&query=Toyota" \
  -H "Authorization: Bearer mock-token-admin"
```

## 4. Sales

### 4.1 List sales

```bash
curl -X GET http://localhost:3000/api/sales \
  -H "Authorization: Bearer mock-token-admin"
```

### 4.2 Get sale detail

```bash
curl -X GET http://localhost:3000/api/sales/sale-001 \
  -H "Authorization: Bearer mock-token-admin"
```

## 5. Notifications

### 5.1 List notifications

```bash
curl -X GET "http://localhost:3000/api/notifications?category=Giao%20dịch&is_read=false" \
  -H "Authorization: Bearer mock-token-admin"
```

### 5.2 Notification count

```bash
curl -X GET "http://localhost:3000/api/notifications/count?is_read=false" \
  -H "Authorization: Bearer mock-token-admin"
```

### 5.3 Notification detail

```bash
curl -X GET http://localhost:3000/api/notifications/notif-001 \
  -H "Authorization: Bearer mock-token-admin"
```

### 5.4 Mark notification read

```bash
curl -X PUT http://localhost:3000/api/notifications/notif-001/read \
  -H "Authorization: Bearer mock-token-admin"
```

## 6. History

### 6.1 List history

```bash
curl -X GET "http://localhost:3000/api/history?query=Toyota" \
  -H "Authorization: Bearer mock-token-admin"
```

## 7. Dashboard

### 7.1 Summary

```bash
curl -X GET http://localhost:3000/api/dashboard/summary \
  -H "Authorization: Bearer mock-token-admin"
```

## 8. Reports

### 8.1 Report summary

```bash
curl -X GET http://localhost:3000/api/reports \
  -H "Authorization: Bearer mock-token-admin"
```

### 8.2 Report goals

```bash
curl -X GET http://localhost:3000/api/reports/goals \
  -H "Authorization: Bearer mock-token-admin"
```

## 9. Support

### 9.1 Support topics

```bash
curl -X GET http://localhost:3000/api/support
```

### 9.2 Contact support

```bash
curl -X POST http://localhost:3000/api/support/contact \
  -H "Authorization: Bearer mock-token-admin" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Nguyễn Văn A",
    "email":"user@example.com",
    "message":"Tôi cần hỗ trợ về đơn hàng"
  }'
```

### 9.3 List support requests

```bash
curl -X GET http://localhost:3000/api/support/requests \
  -H "Authorization: Bearer mock-token-admin"
```

### 9.4 Support request detail

```bash
curl -X GET http://localhost:3000/api/support/requests/req-001 \
  -H "Authorization: Bearer mock-token-admin"
```
