import { UserService } from './UserService';
import { ProductService } from './ProductService';
import { PersonService } from './PersonService';

import { SQLiteUserRepository } from '../../infrastructure/database/repositories/SQLiteUserRepository';
import { SQLiteProductRepository } from '../../infrastructure/database/repositories/SQLiteProductRepository';
import { SQLitePersonRepository } from '../../infrastructure/database/repositories/SQLitePersonRepository';

const userRepository = new SQLiteUserRepository();
const productRepository = new SQLiteProductRepository();
const personRepository = new SQLitePersonRepository();

export const userService = new UserService(userRepository);
export const productService = new ProductService(productRepository);
export const personService = new PersonService(personRepository);
