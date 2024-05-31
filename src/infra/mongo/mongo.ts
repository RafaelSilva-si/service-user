import mongoose from 'mongoose';
import envs from '../../config/global';

const dbURI = envs.MONGO_URI;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(dbURI);
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1);
  }
};

export default connectDB;
