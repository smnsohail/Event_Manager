import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/eventRoutes.js";
import { checkUpcomingReminders } from "./helpers/reminderChecker.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/events", router);

//test
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Event Manager API" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);

  // Check reminders every minute
  setInterval(() => {
    checkUpcomingReminders().catch((err) =>
      console.error("Error checking reminders:", err)
    );
  }, 60 * 1000);
});
