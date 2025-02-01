import express from 'express';
import routes from './routes'; // Import routes/index.ts
import bodyParser from 'body-parser';
const app = express();
// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
// Mount routes under /api
app.use('/api', routes);
export default app;
