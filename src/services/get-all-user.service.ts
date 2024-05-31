import { User } from '../domain/models/user';
import { GetAllUser } from '../domain/usecases/get-all-user';
import UserRepository from '../repository/userRepository';

class GetAllUserService implements GetAllUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAll(params: any): Promise<User[] | []> {
    return await this.userRepository.getAll(params);
  }
}

export default GetAllUserService;
