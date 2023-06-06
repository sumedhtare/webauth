import express, { Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import { db } from './utils/database';

dotenv.config();

const port = process.env.SERVER_PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.use((req: any, res: Response, next: NextFunction) => {
  req.db = db;
  next();
});

app.use('/api/', userRoutes);

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export { app, server };
