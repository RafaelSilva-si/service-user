import { RemoveUser } from '../domain/usecases/remove-user';
import UserRepository from '../repository/userRepository';
import ConflictError from '../utils/errors/conflictError';

class RemoveUserService implements RemoveUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async remove(id: string): Promise<string> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new ConflictError('Usuário não existe!', 404);

    return await this.userRepository.remove(id);
  }
}

export default RemoveUserService;
