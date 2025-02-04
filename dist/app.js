import express from 'express';
import routes from './routes'; // Import routes/index.ts
const app = express();
// Middleware
app.use(express.json());
// Mount routes under /api
app.use('/api', routes);
export default app;
