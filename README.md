# Task Manager App

This is a simple full stack Task Manager application built to demonstrate basic CRUD operations. The app allows users to manage their daily tasks efficiently by adding, viewing, updating, and deleting tasks.

## 🚀 Features

* Add new tasks with title and date
* View all tasks in a clean UI
* Mark tasks as completed / uncompleted
* Delete tasks

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)

## ⚙️ Setup Instructions


### 1. Backend Setup

```bash
cd backend
npm install
npx nodemon server.js
```

Create a `.env` file in the backend folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017
PORT=3000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

## 🔗 API Endpoints

* **GET /** → Fetch all tasks
* **POST /task** → Create a new task
* **PATCH /edit_task/:id** → Update task status
* **DELETE /delete/:id** → Delete a task

## 📌 Notes

* MongoDB is running locally
* CORS is enabled for frontend-backend communication
* Basic validation is implemented

## 👨‍💻 Author

Dinesh Kumar Prajapat
