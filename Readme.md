# 📅 Event Scheduler System (Node.js + Express)

A simple yet powerful backend-only Event Scheduler System built using **Node.js**, **Express.js**, and **file-based JSON storage**. It allows users to **create**, **view**, **search**, **update**, **delete**, and receive **email reminders** for events. The system also supports **recurring events** and **runs reminders every minute**.

---

## ✨ Features

- Create events with title, description, startTime, endTime, and optional recurrence
- View all events sorted by `startTime`
- Update or delete events by ID
- Search events by title or description
- Reminders for upcoming events (within the next 60 minutes)
- Email reminders using Gmail SMTP (Nodemailer)
- Recurring events: `daily`, `weekly`, `monthly`
- Time input/output uses **UTC format only** (`YYYY-MM-DDTHH:MM:SSZ`)

---

## 🔹 Project Structure

```bash
.
├── controllers/
│   └── eventController.js
├── models/
│   └── eventModel.js
├── routes/
│   └── eventRoutes.js
├── helpers/
│   ├── reminderChecker.js
│   └── emailService.js
├── events.json
├── .env              # Local environment variables (ignored by Git)
├── .env.example      # Example for GitHub
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

### 1. Install Node.js
Download and install the latest LTS version of Node.js from [https://nodejs.org](https://nodejs.org).

---

## ⚡ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/smnsohail/Event_Manager.git
cd event-scheduler-backend
```

### 2. Install dependencies

```bash
npm install
```

This will install:
- `express` - Web server framework
- `nodemon` - For auto-reloading in dev (used via `npm run dev`)
- `uuid` - For generating unique IDs for events
- `dotenv` - For loading environment variables
- `nodemailer` - For sending emails
- `dayjs` - For time/date formatting and difference calculations

### 3. Add environment variables

Create a `.env` file in the root folder (this file is ignored by Git).
We have .env.example in this project, rename it to .env and add your credentials as shown below.
Prefer using Gmail Service to test.

Example:
```env
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
REMINDER_EMAIL=recipient@example.com
```

> See `.env.example` in the repo for reference.

### 4. Run the project

```bash
npm run dev
```

> Runs server using `nodemon` at `http://localhost:5000`

---

## 🔌 API Endpoints

**Base URL:** `http://localhost:5000/api/events`

### ➕ Create Event

```http
POST /api/events
```

**Body:**

```json
{
  "title": "Project Demo",
  "description": "Final presentation",
  "startTime": "2025-06-29T10:30:00Z",
  "endTime": "2025-06-29T11:30:00Z",
  "recurrence": "none"
}
```

> ⚡ To test email reminder: set `startTime` to **1 hour ahead of current UTC time**

### 📄 Get All Events

```http
GET /api/events
```

### 🔍 Search Events

```http
GET /api/events/search?query=demo
```

### 🔎 Get Event by ID

```http
GET /api/events/:id
```

### ✏️ Update Event

```http
PUT /api/events/:id
```

**Partial body example:**

```json
{
  "title": "Updated Title"
}
```

### ❌ Delete Event

```http
DELETE /api/events/:id
```

---

## ⏰ Reminder System

- Runs **every minute** in the background
- Logs reminders in console
- Sends **email** for events that start within the next hour
- Uses `REMINDER_EMAIL` from `.env` for delivery

---

## 🔄 Recurring Events

Supports:

- `daily`
- `weekly`
- `monthly`
- `none` (default)

---

## ✉️ Email Notifications

- Uses **Nodemailer** with Gmail SMTP
- Ensure Gmail account has **App Passwords** enabled
- `.env` must include:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
REMINDER_EMAIL=recipient@example.com
```

---

## 📂 Postman Collection

Import this collection into Postman:

👉 [Event Scheduler Postman Collection](https://www.postman.com/mahammadsohilmnadaf/workspace/event-scheduler-biz-digital/collection/46045007-c769901b-3dec-49af-8d44-37ce0783b4d8?action=share&creator=46045007)

> All time values must be in **UTC format** (`YYYY-MM-DDTHH:MM:SSZ`).

---

## 👩‍💼 Author

**Mahammadsohil M Nadaf**  
🔗 [GitHub](https://github.com/smnsohail)  
📍 Naregal, Karnataka, India

---

## 📄 License

This project is open-source and available under the **MIT License**.
