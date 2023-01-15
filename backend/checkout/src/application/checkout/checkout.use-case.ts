import { Order } from "../../domain/entities/order";
import { CouponData } from "../../domain/data/coupon-data";
import { ProductData } from "../../domain/data/product-data";
import { OrderData } from "../../domain/data/order-data";
import { FreightGateway } from "../gateways/freight-gateway";

export class Checkout {
    constructor(
        private readonly productData: ProductData,
        private readonly couponData: CouponData,
        private readonly orderData: OrderData,
        private readonly freightGateway: FreightGateway
    ) {}

    async execute(input: Input): Promise<Output> {
        const order = new Order(input.cpf);
        const freightItems: {
            volume: number;
            density: number;
            quantity: number;
        }[] = [];
        for (const item of input.items) {
            const product = await this.productData.getProduct(item.productId);
            freightItems.push({
                volume: product.volume(),
                density: product.density(),
                quantity: item.quantity,
            });
            order.addItem(product, item.quantity);
        }
        if (input.coupon) {
            const coupon = await this.couponData.getCoupon(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        const freight = await this.freightGateway.calculateFreight(
            freightItems,
            input.from,
            input.to
        );
        await this.orderData.create(order);
        return { total: order.total() + freight, orderCode: order.code() };
    }
}

interface Input {
    cpf: string;
    items: { productId: number; quantity: number }[];
    coupon?: string;
    from?: string;
    to?: string;
}

interface Output {
    total: number;
    orderCode: string;
}
