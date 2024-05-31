import Sinon from 'sinon';
import UserRepository from '../../repository/userRepository';
import assert from 'assert';
import GetAllUserService from '../../services/get-all-user.service';

const mocks = {
  returnAddRepo: require('../mocks/return-success-data.json'),
  returnSuccessData: require('../mocks/return-success-data.json'),
  returnData: require('../mocks/return-data.json'),
};

describe('Listar Usuários', () => {
  const userRepository = new UserRepository();
  const getAllUserService = new GetAllUserService(userRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve Listar todos os usuários ativos registrados.', async () => {
    Sinon.stub(UserRepository.prototype, 'getAll').resolves(mocks.returnData);

    const result = await getAllUserService.getAll({});
    assert.deepStrictEqual(result, mocks.returnData);
  });
});
