import { Order } from "../../domain/entities/order";
import { CouponData } from "../../domain/data/coupon-data";
import { ProductData } from "../../domain/data/product-data";
import { OrderData } from "../../domain/data/order-data";

export class Checkout {
    constructor(
        private readonly productData: ProductData,
        private readonly couponData: CouponData,
        private readonly orderData: OrderData
    ) {}

    async execute(input: Input): Promise<Output> {
        const order = new Order(input.cpf);
        for (const item of input.items) {
            const product = await this.productData.getProduct(item.productId);
            order.addItem(product, item.quantity);
        }
        if (input.coupon) {
            const coupon = await this.couponData.getCoupon(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        await this.orderData.create(order);
        return { total: order.totalWithFreight(), orderCode: order.code() };
    }
}

interface Input {
    cpf: string;
    items: { productId: number; quantity: number }[];
    coupon?: string | null;
}

interface Output {
    total: number;
    orderCode: string;
}
