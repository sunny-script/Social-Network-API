import { Router } from 'express';
const router = Router();
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtController.js'; // Adjust path if necessary
// const thoughtRoutes = Router(); // Use a named constant for the router

// Routes for thoughts
router.route('/')
  .get(getThoughts)  // Get all thoughts
  .post(createThought); // Create a new thought

router.route('/:id')
  .get(getThoughtById)  // Get a single thought by ID
  .put(updateThought)   // Update a thought
  .delete(deleteThought); // Delete a thought

// Routes for reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);  // Add a reaction to a thought

router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction); // Remove a reaction by its ID

// Export the router as `thoughtRoutes`
export {router as thoughtRoutes}

// export { thoughtRoutes, getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction };

