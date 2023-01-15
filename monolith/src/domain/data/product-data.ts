import { Product } from "../entities/product";

export interface ProductData {
    getProduct(id: number): Promise<Product>;
}
