import { Product } from "../../domain/Product";
import { HttpClient } from "../http/HttpClient";
import { CheckoutGateway } from "../../application/CheckoutGateway";
import { OrderOutputDTO } from "../../application/OrderOutputDTO";
import { OrderResponseDTO } from "../../application/OrderResponseDTO";

export class CheckoutGatewayHttp implements CheckoutGateway {
    constructor(readonly http: HttpClient, readonly baseUrl: string) {}

    async getProducts(): Promise<Product[]> {
        const response = await this.http.get<any>(`${this.baseUrl}/products`);
        return response.map(
            (d: any) => new Product(d.id, d.description, d.price)
        );
    }

    async checkout(order: OrderOutputDTO): Promise<OrderResponseDTO> {
        return await this.http.post<any, any>(
            `${this.baseUrl}/checkout`,
            order
        );
    }
}
