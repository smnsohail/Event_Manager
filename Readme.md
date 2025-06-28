#📅 Event Scheduler System (Node.js + Express)

A simple yet powerful Event Scheduler System built using Node.js, Express.js, and file-based JSON storage. This backend system allows users to create, view, search, update, delete, and receive reminders for events with support for recurring events and email notifications.

🚀 Features 

✅ Create events with title, description, start & end times✅ List all events sorted by start time✅ Update or delete events by ID✅ Search events by title or description✅ Persistent storage in events.json✅ Recurring events: daily, weekly, monthly✅ Reminders for upcoming events (within the next 60 minutes)✅ Email notifications (using Nodemailer)✅ Timezone support (IST - UTC+5:30)

📂 Project Structure

├── controllers/
│   └── eventController.js
├── models/
│   └── eventModel.js
├── routes/
│   └── eventRoutes.js
├── helpers/
│   └── reminderChecker.js
├── events.json
├── server.js
├── .env
└── package.json

⚙️ Setup & Installation

Clone the repository

git clone https://github.com/your-username/event-scheduler-backend.git
cd event-scheduler-backend

Install dependencies

npm install

Environment setupCreate a .env file with the following:

PORT=5000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password

Start the server

npm run dev

The server will start on http://localhost:5000 by default.

🔌 API Endpoints (Base: /api/events)

➕ Create Event

POST /api/events

Body: UTC + 05:30 =IST (INDIAN STANDARD TIME)

{
  "title": "Team Sync",
  "description": "Weekly team meeting",
  "startTime": "2025-06-28T21:00:00+05:30",
  "endTime": "2025-06-28T22:00:00+05:30",
  "recurrence": "weekly"
}

📄 Get All Events (sorted by start time)

GET /api/events

🔍 Search Events

GET /api/events/search?query=meeting

🔎 Get Event by ID

GET /api/events/:id

✏️ Update Event by ID

PUT /api/events/:id

Body (partial updates allowed):

{
  "title": "Updated Title"
}

❌ Delete Event

DELETE /api/events/:id

⏰ Reminder System

Runs every minute

Checks for events starting in the next 60 minutes

Logs to the console: "🔔 Reminder: [title] at [time]"

Can also send email reminders (configured via Nodemailer)

🔁 Recurring Events

Supports recurring types:

none

daily

weekly

monthly

These are expanded internally at runtime or during reminder checks.

✉️ Email Notifications

Uses Nodemailer to send reminders.
Make sure to configure the .env variables with a real email.

📬 Postman Collection

A complete Postman Collection is included for testing all endpoints. All time examples use IST (UTC+05:30).

Import the file Event Scheduler.postman_collection.json into Postman.

📌 Tech Stack

Node.js

Express.js

UUID

Dotenv

Nodemailer

🧑‍💻 Author

Mahammadsohil M Nadaf🔗 GitHub📍 Naregal, Karnataka, India

📄 License

This project is open-source and available under the MIT License.

