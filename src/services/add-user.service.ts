import { User } from '../domain/models/user';
import { AddUser, AddUserModel } from '../domain/usecases/add-user';
import UserRepository from '../repository/userRepository';
import ConflictError from '../utils/errors/conflictError';
import { hashPassword } from '../utils/helpers/hashPassword';

class AddUserService implements AddUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async add(data: AddUserModel): Promise<User> {
    if (data.confirmPassword != data.password) {
      throw new ConflictError('Senhas não conferem!', 409);
    }

    const existCPFUser = await this.userRepository.getByCPF(data.CPF);
    const existEmailUser = await this.userRepository.getByEmail(data.email);

    if (existCPFUser) throw new ConflictError('CPF já existente!', 409);
    if (existEmailUser) throw new ConflictError('Email já existente!', 409);

    data.password = await hashPassword(data.password);

    const response = await this.userRepository.add(data);
    return response;
  }
}

export default AddUserService;
