import UserRepository from '../../repository/userRepository';
import ConflictError from '../../utils/errors/conflictError';
import {
  comparePassword,
  hashPassword,
} from '../../utils/helpers/hashPassword';
import { CreateUserDto } from './dtos/createUserDto';
import { UpdateUserDto } from './dtos/updateUserDto';
import { User } from './entity/user';

class UserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getAll(params: any): Promise<User[] | []> {
    return this.userRepository.getAll(params);
  }

  public async addUser(user: CreateUserDto): Promise<User> {
    if (user.confirmPassword != user.password) {
      throw new ConflictError('Senhas não conferem!', 409);
    }

    const existCPFUser = await this.userRepository.getByCPF(user.CPF);
    const existEmailUser = await this.userRepository.getByEmail(user.email);

    if (existCPFUser) throw new ConflictError('CPF já existente!', 409);
    if (existEmailUser) throw new ConflictError('Email já existente!', 409);

    user.password = await hashPassword(user.password);

    const newUser = new CreateUserDto(user);
    const response = await this.userRepository.addUser(newUser);
    return response;
  }

  public async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new ConflictError('Usuário não existe!', 404);

    const existCPFUser = await this.userRepository.getByCPF(user.CPF);
    const existEmailUser = await this.userRepository.getByEmail(user.email);

    if (existCPFUser) throw new ConflictError('CPF já existente!', 409);
    if (existEmailUser) throw new ConflictError('Email já existente!', 409);

    return await this.userRepository.updateUser(id, userData);
  }

  public async removeUser(id: string): Promise<string> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new ConflictError('Usuário não existe!', 404);

    return await this.userRepository.removeUser(id);
  }

  public async validateUser({ email, password }): Promise<string> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new ConflictError('Usuário não existe!', 401);

    const comparedPassword = await comparePassword(password, user.password);
    if (!comparedPassword) throw new ConflictError('Senha Inválida', 401);

    return user.id;
  }
}

export default UserService;
