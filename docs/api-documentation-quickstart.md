# BE_QLBX API Quick Start

File này là hướng dẫn nhanh cho backend BE_QLBX, chỉ nằm trong BE và không ảnh hưởng đến FE.

## 1. Chạy backend

```bash
cd BE_QLBX
npm install
npm run dev
```

Backend sẽ khởi động tại:

- `http://localhost:3000`
- API base: `http://localhost:3000/api`

## 2. Sử dụng API với Postman

1. Mở Postman.
2. Import collection từ file:
   - `BE_QLBX/docs/api-documentation-postman.json`
3. Import environment từ file:
   - `BE_QLBX/docs/api-documentation-postman-environment.json`
4. Chạy request trong collection.

## 3. Sử dụng API với curl

Ví dụ login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mock.com","password":"123456"}'
```

## 4. Base URL cho Android emulator

- `http://10.0.2.2:3000/api`

## 5. Token dùng thử

- `mock-token-admin`

## 6. Tài liệu tham khảo

- `docs/api-documentation.md`
- `docs/API_REFERENCE.md`
- `docs/api-documentation-summary.md`
- `docs/api-documentation-curl.md`
- `docs/api-documentation-postman.md`
- `docs/api-schema.yaml`
