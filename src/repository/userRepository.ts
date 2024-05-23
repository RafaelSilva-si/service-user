import UserModel from '../models/User';
import { CreateUserDto } from '../services/user/dtos/createUserDto';
import { UpdateUserDto } from '../services/user/dtos/updateUserDto';
import { User } from '../services/user/entity/user';
import DBError from '../utils/errors/dbError';

class UserRepository {
  public async getAll(params: any): Promise<User[] | []> {
    try {
      return await UserModel.findAll({ where: { ...params } });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  public async addUser(data: CreateUserDto): Promise<User> {
    try {
      return await UserModel.create({ ...data });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  public async getByCPF(cpf: string): Promise<User | null> {
    try {
      return await UserModel.findOne({ where: { cpf } });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  public async getByEmail(email: string): Promise<User | null> {
    try {
      return await UserModel.findOne({ where: { email } });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  public async getById(id: string): Promise<User | null> {
    try {
      return await UserModel.findOne({ where: { id } });
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  public async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return Promise.resolve({ ...data, id: '1', password: 'Rafa1234-' });
  }

  public async removeUser(id: string): Promise<string> {
    return Promise.resolve(id);
  }
}

export default UserRepository;
