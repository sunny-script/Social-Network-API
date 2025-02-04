import express from 'express';
import routes from './routes'; // Import routes/index.ts
import bodyParser from 'body-parser';
import exp from 'constants';

const app = express();

// Middleware
app.use(express.json());

// Mount routes under /api
app.use('/api', routes);

export default app;
