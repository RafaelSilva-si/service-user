import { User } from '../models/user';

export interface GetUserByID {
  getById(id: string): Promise<User | null>;
}
