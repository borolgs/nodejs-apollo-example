import mongoose from 'mongoose';
import { MONGO_URI, MODE } from './config';

const connectDB = async () => {
  try {
    console.log(`MongoDB Connecting...`);
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    if (MODE === 'development') {
      mongoose.set('debug', (collectionName, method, query, doc) => {
        console.log(`${collectionName}.${method} ${JSON.stringify(query)}`);
      });
    }

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Mongo DB Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
