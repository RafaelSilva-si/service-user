import Sinon from 'sinon';
import * as hashPasswordModule from '../../utils/helpers/hashPassword';
import UserRepository from '../../repository/userRepository';
import assert from 'assert';
import ValidateUserService from '../../services/validate-user.service';

const mocks = {
  returnAddRepo: require('../mocks/return-success-data.json'),
  returnSuccessData: require('../mocks/return-success-data.json'),
  returnData: require('../mocks/return-data.json'),
};

describe('Valida User', () => {
  const userRepository = new UserRepository();
  const validateUserService = new ValidateUserService(userRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Retorna erro se senha nao for valida', async () => {
    Sinon.stub(hashPasswordModule, 'comparePassword').resolves(false);
    Sinon.stub(UserRepository.prototype, 'getByEmail').resolves(
      mocks.returnSuccessData,
    );

    const { email, password } = {
      email: 'rafael@test.com',
      password: '12134',
    };

    const promise = validateUserService.validate({ email, password });
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.message, 'Senha Inválida');
      assert.deepEqual(error.statusCode, 401);
      return true;
    });
  });

  it('Retorna erro se usuario nao existir', async () => {
    Sinon.stub(hashPasswordModule, 'comparePassword').resolves(false);
    Sinon.stub(UserRepository.prototype, 'getByEmail').resolves(null);

    const { email, password } = {
      email: 'rafael@test.com',
      password: '12134',
    };

    const promise = validateUserService.validate({ email, password });
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.message, 'Usuário não existe!');
      assert.deepEqual(error.statusCode, 401);
      return true;
    });
  });
});
