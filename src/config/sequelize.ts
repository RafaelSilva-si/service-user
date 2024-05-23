import envs from './global';

import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: envs.DATABASE,
  username: envs.USER_DB,
  password: envs.PASS_DB,
  host: envs.HOST_DB,
});

export default sequelize;
