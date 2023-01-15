import { Order } from "../entities/order";

export interface OrderData {
    getByCpf(cpf: string): Promise<any>;
    getByCode(code: string): Promise<any>;
    create(order: Order): Promise<void>;
}
