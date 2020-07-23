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

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const product = this.findProduct(productId);
    const index = this.findProductIndex(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProductIndex(prodId);
    this.products.splice(index, 1);
  }

  private findProduct(id: string): Product {
    const product = this.products.find(prod => prod.id === id);
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }

  private findProductIndex(id: string): number {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    if (productIndex < 0) {
      throw new NotFoundException('Could not find product index.');
    }
    return productIndex;
  }
}
