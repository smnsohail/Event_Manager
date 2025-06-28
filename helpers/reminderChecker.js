import { getAllEvents } from '../models/eventModel.js';

export async function checkUpcomingReminders() {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  console.log("Checking reminders at:", now.toLocaleString(), " INDIAN STANDARD TIME (IST)");

  const events = await getAllEvents();
  console.log("Total events in system:", events.length);

  const upcoming = events.filter(event => {
    const start = new Date(event.startTime);
    return start > now && start <= oneHourLater;
  });

  if (upcoming.length === 0) {
    console.log("No upcoming events within the next hour.\n");
  } else {
    console.log(`${upcoming.length} event(s) due in next hour:\n`);
    upcoming.forEach(event => {
      console.log(`"${event.title}" at ${event.startTime} — ${event.description}`);
    });
  }
}

