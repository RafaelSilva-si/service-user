import Sinon from 'sinon';
import UserRepository from '../../repository/userRepository';
import assert from 'assert';
import GetUserByIDService from '../../services/get-user-by-id.service';

const mocks = {
  returnSuccessData: require('../mocks/return-success-data.json'),
};

describe('Get User By Id Service', () => {
  const userRepository = new UserRepository();
  const getUserByIDService = new GetUserByIDService(userRepository);

  afterEach(() => {
    Sinon.restore();
  });

  it('Deve retornar um usuário pelo ID', async () => {
    Sinon.stub(UserRepository.prototype, 'getById')
      .withArgs('1')
      .resolves(mocks.returnSuccessData);

    const result = await getUserByIDService.getById('1');
    assert.deepStrictEqual(result, mocks.returnSuccessData);
  });
});
