import { User } from '../models/user';

export interface GetAllUser {
  getAll(params: any): Promise<User[]>;
}
