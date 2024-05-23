import assert from 'assert';
import { describe, it } from 'mocha';
import UserService from '../../services/user/userService';
import UserRepository from '../../repository/userRepository';
import Sinon from 'sinon';
import ServerError from '../../utils/errors/serverError';
import * as hashPasswordModule from '../../utils/helpers/hashPassword';

const mocks = {
  returnAddRepo: require('../mocks/return-success-data.json'),
  returnSuccessData: require('../mocks/return-success-data.json'),
  returnData: require('../mocks/return-data.json'),
};

describe('Usuário', () => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);

  afterEach(() => {
    Sinon.restore();
  });

  describe('Adicionar Usuário', () => {
    it('Deve adicionar um usuário com os dados Nome, CPF, Email, Senha, Telefone', async () => {
      Sinon.stub(UserRepository.prototype, 'getByCPF')
        .withArgs('475-505-828-52')
        .resolves(null);

      Sinon.stub(UserRepository.prototype, 'getByEmail')
        .withArgs('rafael@test.com')
        .resolves(null);

      Sinon.stub(UserRepository.prototype, 'addUser').resolves(
        mocks.returnAddRepo,
      );

      Sinon.stub(hashPasswordModule, 'hashPassword').resolves(
        'senhaCriptografada',
      );

      const newUser = {
        name: 'Rafael Silva',
        CPF: '475-505-828-52',
        email: 'rafael@test.com',
        password: 'Rafa1234-',
        confirmPassword: 'Rafa1234-',
        phone: '11940028922',
      };

      const result = await userService.addUser(newUser);
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

      const promise = userService.addUser(newUser);

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

      const promise = userService.addUser(newUser);

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

      const promise = userService.addUser(newUser);

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

      Sinon.stub(UserService.prototype, 'addUser').rejects(
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

      const promise = userService.addUser(newUser);

      await assert.rejects(promise, (error: any) => {
        assert.strictEqual(error.statusCode, 500);
        assert.strictEqual(error.message, 'Server error');
        return true;
      });
    });
  });

  describe('Atualizar Usuário', () => {
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

      Sinon.stub(UserRepository.prototype, 'updateUser').resolves(
        mocks.returnSuccessData,
      );

      const updateUser = {
        name: 'Rafael Silva O Melhor',
        CPF: '475-505-828-52',
        email: 'rafael@test.com',
        phone: '11940028922',
      };

      const result = await userService.updateUser('1', updateUser);
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

      const promise = userService.updateUser('1', updateUser);

      await assert.rejects(promise, (error: any) => {
        assert.deepStrictEqual(error.statusCode, 404);
        assert.deepStrictEqual(error.message, 'Usuário não existe!');
        return true;
      });
    });

    it('Deve retornar erro se usuário com CPF já existir', async () => {
      Sinon.stub(UserRepository.prototype, 'getById')
        .withArgs('1')
        .resolves(mocks.returnSuccessData);

      Sinon.stub(UserRepository.prototype, 'getByCPF')
        .withArgs('475-505-828-52')
        .resolves(mocks.returnSuccessData);

      Sinon.stub(UserRepository.prototype, 'getByEmail')
        .withArgs('rafael@test.com')
        .resolves(null);

      const updateUser = {
        name: 'Rafael Silva O Melhor',
        CPF: '475-505-828-52',
        email: 'rafael@test.com',
        phone: '11940028922',
      };

      const promise = userService.updateUser('1', updateUser);

      await assert.rejects(promise, (error: any) => {
        assert.strictEqual(error.statusCode, 409);
        assert.strictEqual(error.message, 'CPF já existente!');
        return true;
      });
    });

    it('Deve retornar erro se usuário com Email já existir', async () => {
      Sinon.stub(UserRepository.prototype, 'getById')
        .withArgs('1')
        .resolves(mocks.returnSuccessData);

      Sinon.stub(UserRepository.prototype, 'getByEmail')
        .withArgs('rafael@test.com')
        .resolves(mocks.returnSuccessData);

      Sinon.stub(UserRepository.prototype, 'getByCPF')
        .withArgs('475-505-828-52')
        .resolves(null);

      const updateUser = {
        name: 'Rafael Silva O Melhor',
        CPF: '475-505-828-52',
        email: 'rafael@test.com',
        phone: '11940028922',
      };

      const promise = userService.updateUser('1', updateUser);

      await assert.rejects(promise, (error: any) => {
        assert.strictEqual(error.statusCode, 409);
        assert.strictEqual(error.message, 'Email já existente!');
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

      Sinon.stub(UserRepository.prototype, 'updateUser').rejects(
        new ServerError('Server error', 500),
      );

      const updateUser = {
        name: 'Rafael Silva O Melhor',
        CPF: '475-505-828-52',
        email: 'rafael@test.com',
        phone: '11940028922',
      };

      const promise = userService.updateUser('1', updateUser);

      await assert.rejects(promise, (error: any) => {
        assert.strictEqual(error.statusCode, 500);
        assert.strictEqual(error.message, 'Server error');
        return true;
      });
    });
  });

  describe('Remover usuário', () => {
    it('Deve remover um usuário com base em seu ID', async () => {
      Sinon.stub(UserRepository.prototype, 'getById')
        .withArgs('1')
        .resolves(mocks.returnSuccessData);

      Sinon.stub(UserService.prototype, 'removeUser').resolves('1');

      const result = await userService.removeUser('1');
      assert.strictEqual(result, '1');
    });

    it('Deve retornar um erro, caso o usuário não exista', async () => {
      Sinon.stub(UserRepository.prototype, 'getById')
        .withArgs('1')
        .resolves(null);

      const promise = userService.removeUser('1');

      await assert.rejects(promise, (error: any) => {
        assert.deepEqual(error.statusCode, 404);
        assert.deepEqual(error.message, 'Usuário não existe!');
        return true;
      });
    });
  });

  describe('Listar Usuários', () => {
    it('Deve Listar todos os usuários ativos registrados.', async () => {
      Sinon.stub(UserRepository.prototype, 'getAll').resolves(mocks.returnData);

      const result = await userService.getAll({});
      assert.deepStrictEqual(result, mocks.returnData);
    });
  });

  describe('Valida User', () => {
    it('Retorna erro se senha nao for valida', async () => {
      Sinon.stub(hashPasswordModule, 'comparePassword').resolves(false);
      Sinon.stub(UserRepository.prototype, 'getByEmail').resolves(
        mocks.returnSuccessData,
      );

      const { email, password } = {
        email: 'rafael@test.com',
        password: '12134',
      };

      const promise = userService.validateUser({ email, password });
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

      const promise = userService.validateUser({ email, password });
      await assert.rejects(promise, (error: any) => {
        assert.deepEqual(error.message, 'Usuário não existe!');
        assert.deepEqual(error.statusCode, 401);
        return true;
      });
    });
  });
});
