import express, { Router } from 'express';
import userRoutes from './api/userRoutes';
import { thoughtRoutes } from './api/thoughtRoutes';

const router = Router();

// Mount user routes
router.use('/users', userRoutes);

// Mount thought routes
router.use('/thoughts', thoughtRoutes);

export default router;
