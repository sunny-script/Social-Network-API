import { Request, Response } from 'express';
import User from '../models/user.js';
import { Types } from 'mongoose';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find()
      .populate('friends', 'username email') // Populate `friends` with `username` and `email`
      .populate('thoughts'); // Optionally populate `thoughts` if needed
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  console.log("Request Object: ", req);
  try {
    const user = await User.findById(req.params.id)
      .populate('friends', 'username email') // Populate `friends` with `username` and `email`
      .populate('thoughts'); // Optionally populate `thoughts` if needed
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    const { username, email } = req.body;
    if (!username || !email) {
      res.status(400).json({ message: 'Username and email are required' });
      return;
    }
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, friendId } = req.params;

    // Validate userId and friendId as ObjectId
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(friendId)) {
      res.status(400).json({ message: 'Invalid userId or friendId' });
      return;
    }

    // Ensure userId and friendId are not the same
    if (userId === friendId) {
      res.status(400).json({ message: 'User cannot be friends with themselves' });
      return;
    }

    // Add friend to user's friends list
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, // Prevent duplicates
      { new: true }
    );

    // Add user to friend's friends list
    const friend = await User.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: userId } }, // Prevent duplicates
      { new: true }
    );

    if (!user || !friend) {
      res.status(404).json({ message: 'User or friend not found' });
      return;
    }

    res.status(200).json({ message: 'Friend added successfully', user });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, friendId } = req.params;

    // Validate userId and friendId as ObjectId
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(friendId)) {
      res.status(400).json({ message: 'Invalid userId or friendId' });
      return;
    }

    // Remove friend from user's friends list
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } }, // Remove friendId from friends
      { new: true }
    );

    // Remove user from friend's friends list
    const friend = await User.findByIdAndUpdate(
      friendId,
      { $pull: { friends: userId } }, // Remove userId from friends
      { new: true }
    );

    if (!user || !friend) {
      res.status(404).json({ message: 'User or friend not found' });
      return;
    }

    res.status(200).json({ message: 'Friend removed successfully', user });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};