import { Router } from 'express';

import { userRoutes } from "./userRoutes.js";
import { thoughtRoutes } from "./thoughtRoutes.js";
const router = Router();

// export {userRoutes, getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction };

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/thoughts/', thoughtRoutes);
router.use('/thoughts/:thoughtId/reactions/', thoughtRoutes);
router.use('/users/:userId/friends/:friendId', userRoutes);
router.use('/:userId/friends/:friendId', userRoutes);
export default router 

