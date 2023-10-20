import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from './routes/UserRoutes.js';

dotenv.config();

// Initialize the Express app
const app = express();

// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Connect to the database
connectDB();

const PORT = process.env.PORT || 5000;

// Define your routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`The app is listening on port ${PORT}`));
