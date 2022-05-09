import mongoose from 'mongoose';
import { MONGODB } from './settings';

const options: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

export const createConnection = async () => {
  try {
    await mongoose.connect(MONGODB, options);
    console.log('connect to mongo');
  } catch (err) {
    console.log('error', err);
  }
};
