import { OrderData } from "../domain/data/order-data";

export class GetOrderByCpf {
    constructor(private readonly orderData: OrderData) {}

    async execute(input: Input): Promise<Output> {
        const order = await this.orderData.getByCpf(input.cpf);
        return { total: order.total };
    }
}

interface Input {
    cpf: string;
}

interface Output {
    total: number;
}
