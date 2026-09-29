import { User } from '../../../domain/models/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { databaseService } from '../DatabaseService';

export class SQLiteUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    await databaseService.run(
      `INSERT INTO users (name, email, username) VALUES (?, ?, ?)`,
      [user.name, user.email, user.username]
    );
  }

  async findAll(): Promise<User[]> {
    return databaseService.query<User>(
      `SELECT id, name, email, username FROM users ORDER BY id DESC`
    );
  }
}
