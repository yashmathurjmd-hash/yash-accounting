# YASH Accounting V50 MVP

This repository contains a backend-first V50-aligned MVP foundation for a professional accounting/GST ERP workflow.

## Stack
- Frontend: React + Vite + Ant Design
- Backend: NestJS + Prisma + PostgreSQL
- Auth: JWT + roles
- Core modules: Company, Account, Product, Voucher, Ledger, Stock, GST

## Included
- User auth shell
- Company master
- Account master
- Product master
- Voucher flow
- Dashboard and reports UI
- Admin UI shell

## Setup

### 1) Install root dependencies
```bash
npm install
```

### 2) Install backend dependencies
```bash
cd backend
npm install
```

### 3) Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 4) Create PostgreSQL database
```sql
CREATE DATABASE yash_accounting;
```

### 5) Update backend env
Edit `backend/.env` and ensure the PostgreSQL URL is correct.

### 6) Run Prisma migration
```bash
cd backend
npx prisma migrate dev --name init
```

### 7) Start project
From repo root:
```bash
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:4000

## Notes
This is a realistic MVP foundation for the YASH Accounting V50 vision, not a fake demo or placeholder product. It is designed to be extended into a full ERP by adding real accounting rules, sync logic, reports, and compliance modules.
