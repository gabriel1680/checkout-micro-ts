import { OrderData } from "../domain/data/order-data";

export class GetOrderByCode {
    constructor(private readonly orderData: OrderData) {}

    async execute(input: Input): Promise<Output> {
        const order = await this.orderData.getByCode(input.code);
        return { total: order.total };
    }
}

interface Input {
    code: string;
}

interface Output {
    total: number;
}
