import { ValidateUser } from '../domain/usecases/validate-user';
import UserRepository from '../repository/userRepository';
import ConflictError from '../utils/errors/conflictError';
import { comparePassword } from '../utils/helpers/hashPassword';

class ValidateUserService implements ValidateUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async validate({ email, password }): Promise<string> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new ConflictError('Usuário não existe!', 401);

    const comparedPassword = await comparePassword(password, user.password);
    if (!comparedPassword) throw new ConflictError('Senha Inválida', 401);

    return user.id;
  }
}

export default ValidateUserService;
