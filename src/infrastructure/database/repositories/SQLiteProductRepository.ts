import { Product } from '../../../domain/models/Product';
import { ProductRepository } from '../../../domain/repositories/ProductRepository';
import { databaseService } from '../DatabaseService';

export class SQLiteProductRepository implements ProductRepository {
  async create(product: Product): Promise<void> {
    await databaseService.run(
      `INSERT INTO products (name, price, stock) VALUES (?, ?, ?)`,
      [product.name, product.price, product.stock]
    );
  }

  async findAll(): Promise<Product[]> {
    return databaseService.query<Product>(
      `SELECT id, name, price, stock FROM products ORDER BY id DESC`
    );
  }
}
