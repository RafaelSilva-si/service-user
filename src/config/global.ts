import dotenv from 'dotenv';

dotenv.config();

const envs = {
  PORT: process.env.PORT,
  DATABASE: process.env.DATABASE,
  USER_DB: process.env.USER_DB,
  HOST_DB: process.env.HOST_DB,
  PASS_DB: process.env.PASS_DB,
};

export default envs;
