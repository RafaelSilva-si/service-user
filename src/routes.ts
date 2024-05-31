import { Router } from 'express';
import UserController from './controllers/userController';
import UserRepository from './repository/userRepository';
import AddUserService from './services/add-user.service';
import UpdateUserService from './services/update-user.service';
import GetAllUserService from './services/get-all-user.service';
import RemoveUserService from './services/remove-user.service';
import ValidateUserService from './services/validate-user.service';

const router = Router();
const userRepository = new UserRepository();
const addUserService = new AddUserService(userRepository);
const updateUserService = new UpdateUserService(userRepository);
const getAllUserService = new GetAllUserService(userRepository);
const removeUserService = new RemoveUserService(userRepository);
const validateUserService = new ValidateUserService(userRepository);

const userController = new UserController(
  addUserService,
  updateUserService,
  getAllUserService,
  removeUserService,
  validateUserService,
);

router.get('/', userController.getAll);
router.post('/', userController.addUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/validate', userController.validateUser);

export default router;
