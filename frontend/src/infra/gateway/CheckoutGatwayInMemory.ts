import { Product } from "../../domain/Product";
import { CheckoutGateway } from "../../application/CheckoutGateway";
import { OrderOutputDTO } from "../../application/OrderOutputDTO";
import { OrderResponseDTO } from "../../application/OrderResponseDTO";

export class CheckoutGatewayInMemory implements CheckoutGateway {
    async getProducts(): Promise<Product[]> {
        return [
            { id: 1, description: "A", price: 1000 },
            { id: 2, description: "B", price: 5000 },
            { id: 3, description: "C", price: 300 },
        ];
    }

    async checkout(order: OrderOutputDTO): Promise<OrderResponseDTO> {
        return { code: "2023000001", total: 10 };
    }
}
