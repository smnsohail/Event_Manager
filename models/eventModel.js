import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const dataFilePath = path.resolve('data/events.json');

export async function getAllEvents() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function saveEvents(events) {
  await fs.writeFile(dataFilePath, JSON.stringify(events, null, 2));
}

export async function addEvent({ title, description, startTime, endTime, recurrence = 'none' }) {
  const events = await getAllEvents();
  const newEvent = {
    id: uuidv4(),
    title,
    description,
    startTime,
    endTime,
    recurrence,
    createdAt: new Date().toISOString(),
  };
  events.push(newEvent);
  await saveEvents(events);
  return newEvent;
}

export async function getEventById(id) {
  const events = await getAllEvents();
  return events.find(event => event.id === id);
}

export async function updateEvent(id, updates) {
  const events = await getAllEvents();
  const index = events.findIndex(event => event.id === id);
  if (index === -1) return null;
  events[index] = { ...events[index], ...updates };
  await saveEvents(events);
  return events[index];
}

export async function deleteEvent(id) {
  const events = await getAllEvents();
  const filtered = events.filter(event => event.id !== id);
  await saveEvents(filtered);
  return events.length !== filtered.length;
}
