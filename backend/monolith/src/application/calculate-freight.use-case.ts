import { FreightCalculator } from "../domain/entities/freight-calculator";
import { ProductData } from "../domain/data/product-data";
import { ZipcodeData } from "../domain/data/zipcode-data";
import { DistanceCalculator } from "../domain/entities/distance-calculator";

export class CalculateFreight {
    constructor(
        private readonly productData: ProductData,
        private readonly zipcodeData: ZipcodeData
    ) {}

    async execute(input: Input): Promise<Output> {
        let distance;
        if (input.from && input.to) {
            const from = await this.zipcodeData.get(input.from);
            const to = await this.zipcodeData.get(input.to);
            if (from && to) {
                distance = DistanceCalculator.calculate(from.coord, to.coord);
            }
        }
        let freight = 0;
        for (const item of input.products) {
            const product = await this.productData.getProduct(item.id);
            freight +=
                FreightCalculator.calculate(product, distance) * item.quantity;
        }
        return { freight };
    }
}

interface Input {
    from?: string;
    to?: string;
    products: { id: number; quantity: number }[];
}
interface Output {
    freight: number;
}
