# 🎥 Vlog Post Web Application

A full-stack vlog platform where users can share posts with images and videos, interact through comments and threaded replies, and manage their profiles.

---

## 🚀 Features

- 🔐 User authentication (Laravel Sanctum)
- 📝 Create posts (text, image upload, video link)
- 💬 Comment and reply system (threaded)
- 👤 Profile page with editable info
- 🖼 Profile avatar upload
- 📄 Pagination for posts
- 📱 Responsive UI with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- React + TypeScript
- Zustand
- Tailwind CSS
- Headless UI

### Backend
- Laravel 13
- MySQL
- Laravel Sanctum

---

## 🔐 Laravel Sanctum Setup

Make sure the app runs on:

- Frontend: http://127.0.0.1:5173  
- Backend: http://127.0.0.1:8000  

Sanctum requires the same domain (`127.0.0.1`) for cookie-based authentication.

---

## ⚙️ How to Run the Project

### 1. Clone the repository

git clone https://github.com/leblancmid/vlog-post.git
cd vlog-post

### 2. Backend Setup (Laravel)
cd backend

cp .env.example .env
php artisan key:generate

### 3. Configure database in .env

DB_DATABASE=vlog_post_db
DB_USERNAME=root
DB_PASSWORD=password

### 4. Run migrations and start server

php artisan migrate
php artisan storage:link
php artisan serve

### 5. Frontend Setup (React)

Frontend Environment

Create a `.env` file inside `/frontend`:

VITE_API_BASE_URL=http://127.0.0.1:8000

cd ../frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173

Demo Account
Email: mark@example.com
Password: password
