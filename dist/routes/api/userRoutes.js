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
    .post(addFriend)
    .delete(removeFriend);
// export default router;
export { router as userRoutes };
// const urlAddress = `http://localhost:3001/api/users/${id}`;
/*
fetch(address, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username: 'johndoe', email: ''})
});
*/ 
