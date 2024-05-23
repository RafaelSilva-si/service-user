import { Router } from 'express';
import UserController from './controllers/userController';
import UserRepository from './repository/userRepository';
import UserService from './services/user/userService';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/', userController.getAll);
router.post('/', userController.addUser);
router.patch('/', userController.updateUser);
router.delete('/', userController.deleteUser);
router.post('/validate', userController.validateUser);

export default router;
