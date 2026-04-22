# BE_QLBX API Summary

## Base URL

- Local: `http://localhost:3000/api`
- Android emulator: `http://10.0.2.2:3000/api`

## Auth

- POST `/api/auth/login`
- POST `/api/auth/register`
- POST `/api/auth/logout`
- POST `/api/auth/forgot-password`
- POST `/api/auth/reset-password`
- GET `/api/auth/me`
- GET `/api/auth/profile`
- PUT `/api/auth/profile`
- GET `/api/auth/settings`
- PUT `/api/auth/settings`

## Cars

- GET `/api/cars`
- GET `/api/cars/{id}`
- POST `/api/cars`
- PUT `/api/cars/{id}`
- DELETE `/api/cars/{id}`

## Mall

- GET `/api/mall`

## Sales

- GET `/api/sales`
- GET `/api/sales/{id}`

## Notifications

- GET `/api/notifications`
- GET `/api/notifications/count`
- GET `/api/notifications/{id}`
- PUT `/api/notifications/{id}/read`

## History

- GET `/api/history`

## Dashboard

- GET `/api/dashboard/summary`

## Reports

- GET `/api/reports`
- GET `/api/reports/goals`

## Support

- GET `/api/support`
- POST `/api/support/contact`
- GET `/api/support/requests`
- GET `/api/support/requests/{id}`

## Notes

- Auth token header: `Authorization: Bearer <token>`.
- Sample token: `mock-token-admin`.
- Response common format: `success`, `message`, `data`.
