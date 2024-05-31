import Sinon from 'sinon';
import UserRepository from '../../repository/userRepository';
import * as hashPasswordModule from '../../utils/helpers/hashPassword';
import assert from 'assert';
import ServerError from '../../utils/errors/serverError';
import AddUserService from '../../services/add-user.service';

const mocks = {
  returnAddRepo: require('../mocks/return-success-data.json'),
  returnSuccessData: require('../mocks/return-success-data.json'),
  returnData: require('../mocks/return-data.json'),
};

describe('Adicionar Usuário', () => {
  const userRepository = new UserRepository();
  const addUserService = new AddUserService(userRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve adicionar um usuário com os dados Nome, CPF, Email, Senha, Telefone', async () => {
    Sinon.stub(UserRepository.prototype, 'getByCPF')
      .withArgs('475-505-828-52')
      .resolves(null);

    Sinon.stub(UserRepository.prototype, 'getByEmail')
      .withArgs('rafael@test.com')
      .resolves(null);

    Sinon.stub(hashPasswordModule, 'hashPassword').resolves(
      'senhaCriptografada',
    );

    Sinon.stub(UserRepository.prototype, 'add').resolves(mocks.returnAddRepo);

    const newUser = {
      name: 'Rafael Silva',
      CPF: '475-505-828-52',
      email: 'rafael@test.com',
      password: 'Rafa1234-',
      confirmPassword: 'Rafa1234-',
      phone: '11940028922',
    };

    const result = await addUserService.add(newUser);
    assert.deepStrictEqual(result, mocks.returnAddRepo);
  });

  it('Deve retornar erro se Senha e Confirmar Senha não estiver identicos', async () => {
    Sinon.stub(UserRepository.prototype, 'getByCPF')
      .withArgs('475-505-828-52')
      .resolves(null);

    Sinon.stub(UserRepository.prototype, 'getByEmail')
      .withArgs('rafael@test.com')
      .resolves(null);

    const newUser = {
      name: 'Rafael Silva',
      CPF: '475-505-828-52',
      email: 'rafael@test.com',
      password: 'Rafa1234-',
      confirmPassword: 'Rafa',
      phone: '11940028922',
    };

    const promise = addUserService.add(newUser);

    await assert.rejects(promise, (error: any) => {
      assert.strictEqual(error.statusCode, 409);
      assert.strictEqual(error.message, 'Senhas não conferem!');
      return true;
    });
  });

  it('Deve retornar erro se usuário com CPF já existir', async () => {
    Sinon.stub(UserRepository.prototype, 'getByCPF')
      .withArgs('475-505-828-52')
      .resolves(mocks.returnSuccessData);

    Sinon.stub(UserRepository.prototype, 'getByEmail')
      .withArgs('rafael@test.com')
      .resolves(null);

    const newUser = {
      name: 'Rafael Silva',
      CPF: '475-505-828-52',
      email: 'rafael@test.com',
      password: 'Rafa1234-',
      confirmPassword: 'Rafa1234-',
      phone: '11940028922',
    };

    const promise = addUserService.add(newUser);

    await assert.rejects(promise, (error: any) => {
      assert.strictEqual(error.statusCode, 409);
      assert.strictEqual(error.message, 'CPF já existente!');
      return true;
    });
  });

  it('Deve retornar erro se usuário com Email já existir.', async () => {
    Sinon.stub(UserRepository.prototype, 'getByCPF')
      .withArgs('475-505-828-52')
      .resolves(null);

    Sinon.stub(UserRepository.prototype, 'getByEmail')
      .withArgs('rafael@test.com')
      .resolves(mocks.returnSuccessData);

    const newUser = {
      name: 'Rafael Silva',
      CPF: '475-505-828-55',
      email: 'rafael@test.com',
      password: 'Rafa1234-',
      confirmPassword: 'Rafa1234-',
      phone: '11940028922',
    };

    const promise = addUserService.add(newUser);

    await assert.rejects(promise, (error: any) => {
      assert.strictEqual(error.statusCode, 409);
      assert.strictEqual(error.message, 'Email já existente!');
      return true;
    });
  });

  it('Deve estourar um erro caso algo de errado!', async () => {
    Sinon.stub(UserRepository.prototype, 'getByCPF')
      .withArgs('475-505-828-52')
      .resolves(null);

    Sinon.stub(UserRepository.prototype, 'getByEmail')
      .withArgs('rafael@test.com')
      .resolves(null);

    Sinon.stub(AddUserService.prototype, 'add').rejects(
      new ServerError('Server error', 500),
    );

    const newUser = {
      name: 'Rafael Silva',
      CPF: '475-505-828-55',
      email: 'rafael@test.com',
      password: 'Rafa1234-',
      confirmPassword: 'Rafa1234-',
      phone: '11940028922',
    };

    const promise = addUserService.add(newUser);

    await assert.rejects(promise, (error: any) => {
      assert.strictEqual(error.statusCode, 500);
      assert.strictEqual(error.message, 'Server error');
      return true;
    });
  });
});
