import pgp from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

import { OrderData } from "../../domain/data/order-data";
import { Order } from "../../domain/entities/order";

export class SQLOderData implements OrderData {
    connection: pg.IClient;

    constructor() {
        this.connection = pgp()("postgres://cccat9@123:4532/app");
    }

    async getByCpf(cpf: string): Promise<any> {
        const result = await this.connection.query(
            "SELECT * FROM cccat9.orders WHERE cpf = $1",
            [cpf]
        );
        if (!result) throw new Error("Order not found");
        return result;
    }

    async getByCode(code: string): Promise<any> {
        const result = await this.connection.query(
            "SELECT * FROM cccat9.orders WHERE code = $1",
            [code]
        );
        if (!result) throw new Error("Order not found");
        return result;
    }

    async create(order: Order): Promise<void> {
        await this.connection.query(
            "INSERT INTO cccat9.orders " +
                "(coupon_code, coupon_percentage, code, cpf, issue_date, freight, total, sequence) " +
                "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [order.totalWithFreight(), order.cpf()]
        );
    }
}
