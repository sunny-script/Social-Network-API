import { Router } from 'express';
import apiRoutes from './api/index.js';
// import userRoutes from './api/userRoutes';
// import { thoughtRoutes } from './api/thoughtRoutes';
const router = Router();
router.use('/api', apiRoutes);
// // Mount user routes
// router.use('/users', userRoutes);
// // Mount thought routes
// router.use('/thoughts', thoughtRoutes);
export default router;
