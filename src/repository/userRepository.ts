import UserModel from '../data/models/User';
import { User } from '../domain/models/user';
import { AddUser, AddUserModel } from '../domain/usecases/add-user';
import { GetAllUser } from '../domain/usecases/get-all-user';
import { RemoveUser } from '../domain/usecases/remove-user';
import { UpdateUser, UpdateUserModel } from '../domain/usecases/update-user';
import DBError from '../utils/errors/dbError';

class UserRepository implements AddUser, UpdateUser, RemoveUser, GetAllUser {
  public async getAll(params: any): Promise<User[] | []> {
    try {
      return await UserModel.find(params);
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  public async add(data: AddUserModel): Promise<User> {
    try {
      const newUser = new UserModel(data);
      const savedUser = await newUser.save();
      return savedUser.toObject();
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  public async getByCPF(cpf: string): Promise<User | null> {
    try {
      return await UserModel.findOne({ cpf }).lean();
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  public async getByEmail(email: string): Promise<User | null> {
    try {
      return await UserModel.findOne({ email }).lean();
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  public async getById(id: string): Promise<User | null> {
    try {
      return await UserModel.findById(id).lean();
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  public async update(id: string, data: UpdateUserModel): Promise<User> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
        new: true,
      }).lean();
      return updatedUser;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }

  public async remove(id: string): Promise<string> {
    try {
      await UserModel.findByIdAndDelete(id);
      return id;
    } catch (error) {
      throw new DBError(error.message, 500);
    }
  }
}

export default UserRepository;
