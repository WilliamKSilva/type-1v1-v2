import { Request, Response } from "express";
import { IUserService } from "../services/user_service";

export type NewUserData = {
  name: string;
  password: string;
  email: string;
};

export class UserController {
  constructor(private userService: IUserService) {}

  public async newUser(request: Request, response: Response): Promise<void> {
    try {
      const payload = request.body as NewUserData;

      const user = await this.userService.newUser(payload);

      response
        .status(200)
        .json({
          data: user,
        })
        .send();
    } catch (error: any) {
      console.log(error);
      response
        .status(400)
        .json({
          message: error,
        })
        .send();
    }
  }
}
