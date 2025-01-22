import { Router } from 'express';
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtController'; // Adjust path if necessary

const thoughtRoutes = Router(); // Use a named constant for the router

// Routes for thoughts
thoughtRoutes.route('/')
  .get(getThoughts)  // Get all thoughts
  .post(createThought); // Create a new thought

thoughtRoutes.route('/:id')
  .get(getThoughtById)  // Get a single thought by ID
  .put(updateThought)   // Update a thought
  .delete(deleteThought); // Delete a thought

// Routes for reactions
thoughtRoutes.route('/:thoughtId/reactions')
  .post(addReaction);  // Add a reaction to a thought

thoughtRoutes.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction); // Remove a reaction by its ID

// Export the router as `thoughtRoutes`
// export { thoughtRoutes, getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction };

// Export the router as `thoughtRoutes`
// export { thoughtRoutes, getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction };
export { thoughtRoutes, getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction };