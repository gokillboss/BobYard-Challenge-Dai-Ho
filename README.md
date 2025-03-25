# 🗨️ Comment System (React + Express + MySQL)

This is a full-stack comment system built for the Bobyard Fullstack (Backend-focused) Challenge. The app supports viewing, adding, and deleting comments — similar to YouTube or Reddit.

## 🛠️ Tech Stack

- **Frontend**: React, React Bootstrap, Axios
- **Backend**: Express.js, Sequelize ORM
- **Database**: MySQL

---

## 🚀 Features

- ✅ View all comments
- ✅ Add new comment (Admin)
- ✅ Delete comment
- ✅ Sort by newest or top-liked
- ⏳ Edit comment (backend ready, UI to be added)

---

## 🐬 MySQL Setup (Local)

### 1. Install MySQL

- **macOS** (with Homebrew):
  ```bash
  brew install mysql
  brew services start mysql
  ```

- **Windows**:
  👉 Download MySQL from MySQL Installer

- **Ubuntu/Debian**:
  ```bash
  sudo apt update
  sudo apt install mysql-server
  ```

### 2. Create database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE bobyard_db;

1. Navigate to the database folder:
```bash
cd database

```sql
mysql -u root -p bobyard_db < insert_comments.sql

Use the same DB name, user and password in `.env` file.

## 📦 Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```ini
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=bobyard_db
   DB_PORT=3306
   PORT=8000
   ```
4. Start server:
   ```bash
   npm run dev
   ```

Server should run at `http://localhost:8000`

## 💻 Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start React app:
   ```bash
   npm start
   ```

App will run at `http://localhost:3000`

## 📬 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/comments` | Get all comments |
| POST | `/api/comments` | Add new comment |
| PUT | `/api/comments/:id` | Edit a comment (optional) |
| DELETE | `/api/comments/:id` | Delete a comment |


## 🧠 Notes

* All comments are posted as "Admin".
* Hit the Like is count from Admin
* Backend supports full CRUD. UI currently supports Add + Delete.
* Sorting by "Newest" or "Top" (likes).

