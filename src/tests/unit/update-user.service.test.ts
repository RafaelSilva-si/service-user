import Sinon from 'sinon';
import UserRepository from '../../repository/userRepository';
import assert from 'assert';
import ServerError from '../../utils/errors/serverError';
import UpdateUserService from '../../services/update-user.service';

const mocks = {
  returnAddRepo: require('../mocks/return-success-data.json'),
  returnSuccessData: require('../mocks/return-success-data.json'),
  returnData: require('../mocks/return-data.json'),
};

describe('Atualizar Usuário', () => {
  const userRepository = new UserRepository();
  const updateUserService = new UpdateUserService(userRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve atualizar todas informações do usuário verificando pelo ID.', async () => {
    Sinon.stub(UserRepository.prototype, 'getByCPF')
      .withArgs('475-505-828-52')
      .resolves(null);

    Sinon.stub(UserRepository.prototype, 'getByEmail')
      .withArgs('rafael@test.com')
      .resolves(null);

    Sinon.stub(UserRepository.prototype, 'getById')
      .withArgs('1')
      .resolves(mocks.returnSuccessData);

    Sinon.stub(UserRepository.prototype, 'update').resolves(
      mocks.returnSuccessData,
    );

    const updateUser = {
      name: 'Rafael Silva O Melhor',
      CPF: '475-505-828-52',
      email: 'rafael@test.com',
      phone: '11940028922',
    };

    const result = await updateUserService.update('1', updateUser);
    assert.deepStrictEqual(result, mocks.returnSuccessData);
  });

  it('Deve retornar um erro se o usuário não existir com base no ID', async () => {
    Sinon.stub(UserRepository.prototype, 'getByCPF')
      .withArgs('475-505-828-52')
      .resolves(null);

    Sinon.stub(UserRepository.prototype, 'getByEmail')
      .withArgs('rafael@test.com')
      .resolves(null);

    Sinon.stub(UserRepository.prototype, 'getById')
      .withArgs('1')
      .resolves(null);

    const updateUser = {
      name: 'Rafael Silva O Melhor',
      CPF: '475-505-828-52',
      email: 'rafael@test.com',
      phone: '11940028922',
    };

    const promise = updateUserService.update('1', updateUser);

    await assert.rejects(promise, (error: any) => {
      assert.deepStrictEqual(error.statusCode, 404);
      assert.deepStrictEqual(error.message, 'Usuário não existe!');
      return true;
    });
  });

  it('Deve estourar um erro caso algo de errado!', async () => {
    Sinon.stub(UserRepository.prototype, 'getById')
      .withArgs('1')
      .resolves(mocks.returnSuccessData);

    Sinon.stub(UserRepository.prototype, 'getByCPF')
      .withArgs('475-505-828-52')
      .resolves(null);

    Sinon.stub(UserRepository.prototype, 'getByEmail')
      .withArgs('rafael@test.com')
      .resolves(null);

    Sinon.stub(UserRepository.prototype, 'update').rejects(
      new ServerError('Server error', 500),
    );

    const updateUser = {
      name: 'Rafael Silva O Melhor',
      CPF: '475-505-828-52',
      email: 'rafael@test.com',
      phone: '11940028922',
    };

    const promise = updateUserService.update('1', updateUser);

    await assert.rejects(promise, (error: any) => {
      assert.strictEqual(error.statusCode, 500);
      assert.strictEqual(error.message, 'Server error');
      return true;
    });
  });
});
