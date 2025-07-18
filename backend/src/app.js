import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './connection/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import careerRoutes from './routes/careers.routes.js';

dotenv.config(); // Load environment variables from .env file
connectDB();
const app = express();

// Configuración CORS
app.use(cors({
    origin: 'http://localhost:5173', // URL del frontend
    credentials: true // Permitir cookies
}));

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(cookieParser()); 

app.use('/api', authRoutes);
app.use('/api', careerRoutes);

export default app;