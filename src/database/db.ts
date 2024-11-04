import mongoose from 'mongoose';
import config from '../../config';

async function connectDB() {
  try {
    await mongoose.connect(config.mongourl);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

export default connectDB;
