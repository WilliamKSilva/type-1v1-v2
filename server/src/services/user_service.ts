import { NewUserData } from "../controllers/user_controller";
import { User } from "../models/user_model";
import { IUserRepository } from "../repositories/user_repository";

export interface IUserService {
    newUser(data: NewUserData): Promise<User | null>;
}

export class UserService {
    constructor(private userRepository: IUserRepository) { }

    public async newUser(data: NewUserData): Promise<User | null> {
        const foundUser = await this.userRepository.findUserByEmail(data.email);

        if (foundUser) {
            throw new Error('Usuário já cadastrado!');
        }

        const createdUser = await this.userRepository.newUser(data);

        return createdUser;
    }
}