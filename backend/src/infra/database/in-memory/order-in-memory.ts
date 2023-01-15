import { OrderData } from "../../../domain/data/order-data";
import { Order } from "../../../domain/entities/order";

export class OrderInMemory implements OrderData {
    constructor(readonly orders: Order[] = []) {}

    async create(order: Order): Promise<void> {
        this.orders.push(order);
    }

    async getByCode(code: string): Promise<any> {
        const order = this.orders.find((o) => o.code() === code) ?? null;
        if (!order) throw new Error("Order not found");
        return { total: order.total() };
    }

    async getByCpf(cpf: string): Promise<any> {
        const order = this.orders.find((o) => o.cpf() === cpf) ?? null;
        if (!order) throw new Error("Order not found");
        return { total: order.total() };
    }
}
