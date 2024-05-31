import dotenv from 'dotenv';

dotenv.config();

const envs = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};

export default envs;
