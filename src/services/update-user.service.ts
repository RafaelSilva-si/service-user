import { User } from '../domain/models/user';
import { UpdateUser, UpdateUserModel } from '../domain/usecases/update-user';
import UserRepository from '../repository/userRepository';
import ConflictError from '../utils/errors/conflictError';

class UpdateUserService implements UpdateUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async update(id: string, data: UpdateUserModel): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new ConflictError('Usuário não existe!', 404);

    return await this.userRepository.update(id, data);
  }
}

export default UpdateUserService;
