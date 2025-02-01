import express from 'express';
import routes from './routes/index.js';
import connectDB from './config/db.js';
await connectDB();
const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
