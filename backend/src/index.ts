import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { taskRouter } from './routes';
import { AppError } from './token/AppError';
import { ApiAnswer } from './token/ApiAnswer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:80', 'http://localhost'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Add request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.json(new ApiAnswer(true, 'Welcome to the API', null));
});

app.use("/tasks", taskRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(new ApiAnswer(false, err.message, err.data));
  }
  return res.status(500).json(new ApiAnswer(false, "Internal server error", null));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 