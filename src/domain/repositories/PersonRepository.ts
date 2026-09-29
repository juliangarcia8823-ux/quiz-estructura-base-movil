import { Person } from '../models/Person';

export interface PersonRepository {
  create(person: Person): Promise<void>;
  findAll(): Promise<Person[]>;
}
