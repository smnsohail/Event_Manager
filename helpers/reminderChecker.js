import { getAllEvents } from "../models/eventModel.js";
import { sendReminderEmail } from './emailService.js';
dotenv.config({path: '../.env'});
import dotenv from 'dotenv';
dotenv.config();

export async function checkUpcomingReminders() {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  const events = await getAllEvents();

  const upcoming = events.filter((event) => {
    const { startTime, recurrence } = event;
    const originalStart = new Date(startTime);

    let nextOccurrence = new Date(originalStart);

    // Handle recurrence
    if (recurrence === "daily") {
      while (nextOccurrence < now) {
        nextOccurrence.setDate(nextOccurrence.getDate() + 1);
      }
    } else if (recurrence === "weekly") {
      while (nextOccurrence < now) {
        nextOccurrence.setDate(nextOccurrence.getDate() + 7);
      }
    } else if (recurrence === "monthly") {
      while (nextOccurrence < now) {
        nextOccurrence.setMonth(nextOccurrence.getMonth() + 1);
      }
    }

    // Non-recurring or first-time events
    if (recurrence === "none" || !recurrence) {
      return originalStart > now && originalStart <= oneHourLater;
    }

    // For recurring, check if next occurrence is within next hour
    return nextOccurrence > now && nextOccurrence <= oneHourLater;
  });

  if (upcoming.length > 0) {
    console.log(`\n Found ${upcoming.length} upcoming event(s):`);

    upcoming.forEach((event) => {
      console.log(`"${event.title}" → ${event.description}`);

      const subject = `Reminder: ${event.title}`;
      const message = `Hey, this is a reminder for "${event.title}" happening at ${event.startTime}.\n\nDetails:\n${event.description}`;
      const recipient =  process.env.RECIPIENT_EMAIL// Hardcoded or add `email` to event if needed

      sendReminderEmail(recipient, subject, message);
    });
  } else {
    console.log(`[No upcoming events as of ${now.toLocaleString()}]`);
  }
}
