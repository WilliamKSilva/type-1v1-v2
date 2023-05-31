import { NewUserData } from "../controllers/user_controller";
import { User } from "../models/user_model";
import { IUserRepository } from "../repositories/user_repository";
import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export interface IUserService {
  newUser(data: NewUserData): Promise<User | null>;
}

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  public async newUser(data: NewUserData): Promise<User | null> {
    const foundUser = await this.userRepository.findUserByEmail(data.email);

    if (foundUser) {
      throw new Error("Usuário já cadastrado!");
    }

    data.password = await hash(data.password, 10);

    const userData = {
      uuid: uuidv4(),
      ...data,
    };

    console.log(userData);

    const createdUser = await this.userRepository.newUser(userData);

    return createdUser;
  }
}
