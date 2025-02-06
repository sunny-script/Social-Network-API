import { Router } from 'express';
import { userRoutes } from "./userRoutes.js";
import { thoughtRoutes } from "./thoughtRoutes.js";

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router 

// demonstrate GET routes for all users and all thoughts being tested in Insomnia. DONE

// demonstrate GET routes for a single user and a single thought being tested in Insomnia.

// demonstrate POST, PUT, and DELETE routes for users and thoughts being tested in Insomnia.

// demonstrate POST and DELETE routes for a user's friend list being tested in Insomnia.

// demonstrate POST and DELETE routes for reactions to thoughts being tested in Insomnia.