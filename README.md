# Rioflix - Nền tảng xem phim trực tuyến hiện đại

Rioflix là nền tảng xem phim trực tuyến cao cấp được phát triển bằng Next.js 16, React 19, Tailwind CSS v4 và Prisma ORM.

## Tính năng nổi bật

- 🎬 **Trình phát phim chuẩn HLS:** Tích hợp `hls.js`, stream proxy hỗ trợ đa luồng và tương thích mọi trình duyệt.
- 🍿 **Xem chung (Watch Party):** Tạo phòng xem chung thời gian thực, đồng bộ video và chat trực tiếp.
- 👤 **Hệ thống tài khoản & xác thực:** Hỗ trợ đăng ký, đăng nhập, quên mật khẩu (SMTP), thông tin cá nhân.
- 📑 **Quản lý danh sách & lịch sử:** Danh sách xem yêu thích, lịch sử xem phim đồng bộ vào cơ sở dữ liệu.
- 🔍 **Tìm kiếm & Phân loại nâng cao:** Lọc theo chủ đề, thể loại, quốc gia, năm phát hành, diễn viên.
- 🛠️ **Trang quản trị (Admin Dashboard):** Thống kê lượt xem, quản trị người dùng, phim và thiết lập hệ thống.
- 📱 **Thiết kế Responsive & Giao diện tối ưu:** Trải nghiệm mượt mà trên cả Mobile, Tablet và Desktop.

## Công nghệ sử dụng

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & Icons:** React 19, Tailwind CSS v4, [Lucide React](https://lucide.dev/)
- **Cơ sở dữ liệu:** [Prisma ORM](https://www.prisma.io/) (Hỗ trợ MySQL và SQLite)
- **Xác thực:** [NextAuth.js v5](https://authjs.dev/)
- **Media:** HLS.js

## Hướng dẫn cài đặt & khởi chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình môi trường (.env.local)
Kiểm tra file `.env.local` đã có các biến môi trường:
```env
DATABASE_URL="mysql://username:password@host:3306/rioflix" # Hoặc file:./dev.db
AUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-admin-password"
```

### 3. Đồng bộ Database & Seed dữ liệu
```bash
npx prisma db push
npm run db:seed
```

### 4. Khởi chạy server phát triển
```bash
npm run dev
```
Truy cập tại: `http://localhost:3000`

---
© 2026 Rioflix. All rights reserved.
