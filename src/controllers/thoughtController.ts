import { Request, Response } from 'express';
import Thought from '../models/thought.js';
import User from '../models/user.js';

// GET all thoughts
export const getThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// GET a single thought by ID
export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// POST a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtText, username, userId } = req.body;

    // Create a new thought
    const newThought = await Thought.create({ thoughtText, username });

    // Find the user and add the thought ID to their thoughts array
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    user.thoughts.push(newThought._id);
    await user.save();

    res.status(201).json({ message: 'Thought created successfully', thought: newThought });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// PUT to update a thought by ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedThought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// DELETE a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }

    // Remove the thought ID from the associated user's thoughts array
    await User.findOneAndUpdate(
      { thoughts: deletedThought._id },
      { $pull: { thoughts: deletedThought._id } }
    );

    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// POST to add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }

    thought.reactions.push(req.body); // Add the reaction to the reactions array
    await thought.save();

    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// DELETE a reaction by ID from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }

    // Remove the reaction by its ID
    thought.reactions.pull({ _id: req.params.reactionId });
    await thought.save();

    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Export all thought controller functions
// export {
//   getThoughts,
//   getThoughtById,
//   createThought,
//   updateThought,
//   deleteThought,
//   addReaction,
//   removeReaction,
// };
