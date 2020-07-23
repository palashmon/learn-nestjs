import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  // Create request
  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random()
      .toString(16)
      .slice(2);
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  // Find All request
  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(productId: string) {
    const product = this.findProduct(productId);
    return { ...product };
  }

  private findProduct(id: string): Product {
    const product = this.products.find(prod => prod.id === id);
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
