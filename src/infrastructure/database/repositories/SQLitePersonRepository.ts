import { Person } from '../../../domain/models/Person';
import { PersonRepository } from '../../../domain/repositories/PersonRepository';
import { databaseService } from '../DatabaseService';

export class SQLitePersonRepository implements PersonRepository {
  async create(person: Person): Promise<void> {
    await databaseService.run(
      `INSERT INTO persons (name, document, phone) VALUES (?, ?, ?)`,
      [person.name, person.document, person.phone]
    );
  }

  async findAll(): Promise<Person[]> {
    return databaseService.query<Person>(
      `SELECT id, name, document, phone FROM persons ORDER BY id DESC`
    );
  }
}
