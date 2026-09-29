import { Product } from '../../domain/models/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async register(product: Product): Promise<void> {
    if (!product.name.trim()) {
      throw new Error('El nombre del producto es obligatorio.');
    }

    if (product.price <= 0) {
      throw new Error('El precio debe ser mayor que cero.');
    }

    if (product.stock < 0) {
      throw new Error('El stock no puede ser negativo.');
    }

    await this.repository.create(product);
  }

  async getAll(): Promise<Product[]> {
    return this.repository.findAll();
  }
}
