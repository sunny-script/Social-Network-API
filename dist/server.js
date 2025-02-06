import express from 'express';
import routes from './routes/api/index.js';
import connectDB from './config/db.js';
const PORT = process.env.PORT || 5001;
const app = express();
(async () => {
    await connectDB();
})();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Mount routes
app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
