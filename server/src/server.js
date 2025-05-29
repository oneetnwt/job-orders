import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.js';
import jobOrderRoutes from './routes/job-order.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/job-orders', jobOrderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});