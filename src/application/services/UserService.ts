import { User } from '../../domain/models/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async register(user: User): Promise<void> {
    if (!user.name.trim()) {
      throw new Error('El nombre es obligatorio.');
    }

    if (!user.email.trim()) {
      throw new Error('El correo electrónico es obligatorio.');
    }

    if (!user.username.trim()) {
      throw new Error('El usuario es obligatorio.');
    }

    await this.repository.create(user);
  }

  async getAll(): Promise<User[]> {
    return this.repository.findAll();
  }
}
