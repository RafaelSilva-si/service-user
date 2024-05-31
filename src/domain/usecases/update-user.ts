import { User } from '../models/user';

export interface UpdateUserModel {
  name: string;
  email: string;
  CPF: string;
  phone: string;
}

export interface UpdateUser {
  update(id: string, data: UpdateUserModel): Promise<User>;
}
