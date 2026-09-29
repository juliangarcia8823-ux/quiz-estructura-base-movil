import { User } from '../models/User';

export interface UserRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[]>;
}
