import Sinon from 'sinon';
import UserRepository from '../../repository/userRepository';
import assert from 'assert';
import RemoveUserService from '../../services/remove-user.service';

const mocks = {
  returnAddRepo: require('../mocks/return-success-data.json'),
  returnSuccessData: require('../mocks/return-success-data.json'),
  returnData: require('../mocks/return-data.json'),
};

describe('Remover usuário', () => {
  afterEach(() => {
    Sinon.restore();
  });

  const userRepository = new UserRepository();
  const removeUserService = new RemoveUserService(userRepository);

  it('Deve remover um usuário com base em seu ID', async () => {
    Sinon.stub(UserRepository.prototype, 'getById')
      .withArgs('1')
      .resolves(mocks.returnSuccessData);

    Sinon.stub(RemoveUserService.prototype, 'remove').resolves('1');

    const result = await removeUserService.remove('1');
    assert.strictEqual(result, '1');
  });

  it('Deve retornar um erro, caso o usuário não exista', async () => {
    Sinon.stub(UserRepository.prototype, 'getById')
      .withArgs('1')
      .resolves(null);

    const promise = removeUserService.remove('1');

    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.statusCode, 404);
      assert.deepEqual(error.message, 'Usuário não existe!');
      return true;
    });
  });
});
