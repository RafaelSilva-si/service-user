import { NextFunction, Request, Response } from 'express';
import AddUserService from '../services/add-user.service';
import UpdateUserService from '../services/update-user.service';
import GetAllUserService from '../services/get-all-user.service';
import RemoveUserService from '../services/remove-user.service';
import ValidateUserService from '../services/validate-user.service';
import GetUserByIDService from '../services/get-user-by-id.service';

class UserController {
  private readonly addUserService: AddUserService;
  private readonly updateUserService: UpdateUserService;
  private readonly getAllUserService: GetAllUserService;
  private readonly removeUserService: RemoveUserService;
  private readonly validateUserService: ValidateUserService;
  private readonly getUserByIDService: GetUserByIDService;

  constructor(
    addUserService: AddUserService,
    updateUserService: UpdateUserService,
    getAllUserService: GetAllUserService,
    removeUserService: RemoveUserService,
    validateUserService: ValidateUserService,
    getUserByIDService: GetUserByIDService,
  ) {
    this.addUserService = addUserService;
    this.updateUserService = updateUserService;
    this.getAllUserService = getAllUserService;
    this.removeUserService = removeUserService;
    this.validateUserService = validateUserService;
    this.getUserByIDService = getUserByIDService;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.getAllUserService.getAll(req.query);
      res.status(200).send(result);
    } catch (error) {
      res.status(error.status || 500).send(error.message || 'Server Error');
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.getUserByIDService.getById(req.params.id);
      res.status(200).send(result);
    } catch (error) {
      res.status(error.status || 500).send(error.message || 'Server Error');
      next(error);
    }
  };

  public addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.addUserService.add(req.body);
      res.status(201).send(result);
    } catch (error) {
      res.status(error.status || 500).send(error.message || 'Server Error');
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.updateUserService.update(
        req.params.id,
        req.body,
      );
      res.status(201).send(result);
    } catch (error) {
      res.status(error.status || 500).send(error.message || 'Server Error');
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.removeUserService.remove(req.params.id);
      res.status(201).send(result);
    } catch (error) {
      res.status(error.status || 500).send(error.message || 'Server Error');
      next(error);
    }
  };

  public validateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.validateUserService.validate(req.body);
      res.status(201).send(result);
    } catch (error) {
      res.status(error.status || 500).send(error.message || 'Server Error');
      next(error);
    }
  };
}

export default UserController;
