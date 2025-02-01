import { Router } from 'express';
const router = Router();
import { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend, } from '../../controllers/userController.js';
router.route('/')
    .get(getUsers)
    .post(createUser);
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
router.route('/:userId/friends/:friendId')
    .post(addFriend) // Add a friend
    .delete(removeFriend); // Remove a friend
// export default router;
export { router as userRoutes };
