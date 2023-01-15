import { Product } from "../domain/Product";
import { OrderOutputDTO } from "./OrderOutputDTO";
import { OrderResponseDTO } from "./OrderResponseDTO";

export interface CheckoutGateway {
    getProducts(): Promise<Product[]>;
    checkout(order: OrderOutputDTO): Promise<OrderResponseDTO>;
}
