import { User } from '../models/user';

export interface AddUserModel {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  CPF: string;
  phone: string;
}

export interface AddUser {
  add(data: AddUserModel): Promise<User>;
}
