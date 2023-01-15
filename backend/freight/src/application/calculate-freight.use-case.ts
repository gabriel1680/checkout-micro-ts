import { FreightCalculator } from "../domain/entities/freight-calculator";
import { ZipcodeData } from "../domain/data/zipcode-data";
import { DistanceCalculator } from "../domain/entities/distance-calculator";

export class CalculateFreight {
    constructor(private readonly zipcodeData: ZipcodeData) {}

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
            freight +=
                FreightCalculator.calculate(
                    item.volume,
                    item.density,
                    distance
                ) * item.quantity;
        }
        return { freight };
    }
}

interface Input {
    from?: string;
    to?: string;
    products: { volume: number; density: number; quantity: number }[];
}
interface Output {
    freight: number;
}
