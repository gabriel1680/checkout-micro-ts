import { ProductData } from "../../../domain/data/product-data";
import { Product } from "../../../domain/entities/product";
import { products as data } from "./data";

export class ProductInMemory implements ProductData {
    constructor(readonly products: Product[] = data) {}

    async getProduct(id: number): Promise<Product> {
        const product = this.products.find((p) => p.id === id) ?? null;
        if (!product) throw new Error("Product not found");
        return product;
    }
}
