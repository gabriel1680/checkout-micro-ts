import pgp from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

import { ProductData } from "../../domain/data/product-data";
import { Product } from "../../domain/entities/product";

export class SQLProductData implements ProductData {
    connection: pg.IClient;

    constructor() {
        this.connection = pgp()("postgres://cccat9@123:4532/app");
    }

    async getProduct(id: number): Promise<Product> {
        const productData = (await this.connection.query(
            "SELECT * FROM cccat9.products WHERE id = $1",
            [id]
        )) as any;
        if (!productData) throw new Error("Product not found");
        return new Product(
            productData.id,
            productData.description,
            parseFloat(productData.price),
            parseFloat(productData.width),
            parseFloat(productData.height),
            parseFloat(productData.length),
            parseFloat(productData.weight)
        );
    }
}
