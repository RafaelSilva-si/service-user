import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user/userService';

class UserController {
  private readonly userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.getAll(req.query);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.addUser(req.body);
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.userService.updateUser(req.params.id, req.body);
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.userService.removeUser(req.params.id);
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  public validateUser = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.validateUser(req.body);
      res.status(201).send(result);
    } catch (error) {
      res.status(error.statusCode || 500).send(error.message);
    }
  };
}

export default UserController;
