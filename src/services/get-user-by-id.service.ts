import { User } from '../domain/models/user';
import { GetUserByID } from '../domain/usecases/get-user-by-id';
import UserRepository from '../repository/userRepository';

class GetUserByIDService implements GetUserByID {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getById(id: string): Promise<User | null> {
    const user = await this.userRepository.getById(id);
    return user;
  }
}

export default GetUserByIDService;
