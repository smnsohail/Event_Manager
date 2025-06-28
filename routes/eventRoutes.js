import express from 'express';
import { createEvent, deleteEventById, getEventByIdController, getEvents, searchEvents, updateEventById } from '../controllers/eventController.js';

const router = express.Router();

// test
router.get('/test', async (req, res) =>{
    res.status(200).json({ message: 'Welcome to the Event Manager API' });   
});


router.post('/', createEvent);
router.get('/', getEvents);
router.get('/search', searchEvents); //Got a learning that this need to be placed before parameterized routes
router.get('/:id', getEventByIdController);
router.put('/:id', updateEventById);
router.delete('/:id', deleteEventById);


export default router;