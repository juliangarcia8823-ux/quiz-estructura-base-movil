import { Person } from '../../domain/models/Person';
import { PersonRepository } from '../../domain/repositories/PersonRepository';

export class PersonService {
  constructor(private readonly repository: PersonRepository) {}

  async register(person: Person): Promise<void> {
    if (!person.name.trim()) {
      throw new Error('El nombre es obligatorio.');
    }

    if (!person.document.trim()) {
      throw new Error('El documento es obligatorio.');
    }

    if (!person.phone.trim()) {
      throw new Error('El teléfono es obligatorio.');
    }

    await this.repository.create(person);
  }

  async getAll(): Promise<Person[]> {
    return this.repository.findAll();
  }
}
