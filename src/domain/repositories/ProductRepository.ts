import { Product } from '../models/Product';

export interface ProductRepository {
  create(product: Product): Promise<void>;
  findAll(): Promise<Product[]>;
}
