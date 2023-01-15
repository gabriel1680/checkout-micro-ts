import { Product } from "./product";

export class FreightCalculator {
    static calculate(product: Product, distance: number = 1000): number {
        const freight = distance * product.volume() * (product.density() / 100);
        return freight < 10 ? 10 : Math.round(freight * 100) / 100;
    }
}
