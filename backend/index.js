import express, { json } from 'express';
import UsersRoutes from './src/routes/users.routes';
import cors from 'cors';
import connectDB from './src/models/dbconnect';
import dotenv from 'dotenv';
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(json());


app.use('/api/users', UsersRoutes);

const PORT = 3333;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
