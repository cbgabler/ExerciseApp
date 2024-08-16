import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import exerciseRoutes from './routes/ExerciseRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/exercises', exerciseRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
