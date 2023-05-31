import { PoolClient } from "pg";
import { User } from "../models/user_model";

export interface IUserRepository {
  newUser(user: Partial<User>): Promise<User | null>;
  findUserByEmail(user_id: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  constructor(private dbClient: PoolClient) {}

  public async newUser({
    uuid,
    name,
    email,
    password,
    created_at,
    updated_at,
  }: Partial<User>): Promise<User | null> {
    const insertQuery = `INSERT INTO users (uuid, name, email, password) VALUES ($1, $2, $3, $4)`;
    const data = [uuid, name, email, password];

    await this.dbClient.query(insertQuery, data);

    const createdUser = (
      await this.dbClient.query(`SELECT * FROM users WHERE uuid = $1`, [uuid])
    ).rows.at(0);

    const user = new User(
      createdUser.uuid,
      createdUser.name,
      createdUser.email,
      createdUser.password,
      createdUser.created_at,
      createdUser.updated_at
    );

    return user;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const foundUser = (
      await this.dbClient.query(`SELECT * FROM users WHERE email = $1`, [email])
    ).rows.at(0);

    if (foundUser) {
      const user = new User(
        foundUser.uuid,
        foundUser.name,
        foundUser.email,
        foundUser.password,
        foundUser.created_at,
        foundUser.updated_at
      );

      return user;
    }

    return null;
  }
}
