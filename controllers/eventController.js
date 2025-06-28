import {
  addEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../models/eventModel.js";

export async function createEvent(req, res) {
  try {
    // console.log(req.body);
    const { title, description, startTime, endTime, recurrence } = req.body;
    if (!title || !description || !startTime || !endTime) {
      return res
        .status(400)
        .json({
          message:
            "All fields are required: title, description, startTime, endTime",
        });
    }
    if (new Date(startTime) >= new Date(endTime)) {
      return res
        .status(400)
        .json({ message: "startTime must be earlier than endTime" });
    }
    const event = await addEvent({
      title,
      description,
      startTime,
      endTime,
      recurrence,
    });
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function getEvents(req, res) {
  try {
    const events = await getAllEvents();
    // console.log(events);
    const sorted = events.sort(
      (a, b) => new Date(a.startTime) - new Date(b.startTime)
    );
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function getEventByIdController(req, res) {
  try {
    const { id } = req.params;
    // console.log(id);
    const event = await getEventById(id);
    // console.log(event);
    if(!event){
        return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function updateEventById(req, res) {
  try {
    const { id } = req.params;
    // console.log(id);
    const { title, description, startTime, endTime, recurrence } = req.body;

    const updated = await updateEvent(id, {
      ...(title && { title }),
      ...(description && { description }),
      ...(startTime && { startTime }),
      ...(endTime && { endTime }),
      ...(recurrence && { recurrence }),
    });

    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function deleteEventById(req, res) {
  try {
    const { id } = req.params;
    const deleted = await deleteEvent(id);

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function searchEvents(req, res) {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' });
    }
    // console.log(query)

    const events = await getAllEvents();
    // console.log(events);
    const lowerQuery = query.toLowerCase();

    const results = events.filter(event =>
      event.title.toLowerCase().includes(lowerQuery) ||
      event.description.toLowerCase().includes(lowerQuery)
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}