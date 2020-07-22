import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  // Create request
  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString(16).slice(2);
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  // Find All request
  getProducts(): Product[] {
    return [...this.products];
  }
}
