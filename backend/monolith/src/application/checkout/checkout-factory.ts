import { Checkout } from "./checkout.use-case";
import { CouponInMemory } from "../../infra/database/in-memory/coupon-in-memory";
import { ProductInMemory } from "../../infra/database/in-memory/product-in-memory";
import { OrderInMemory } from "../../infra/database/in-memory/order-in-memory";

export class CheckoutFactory {
    static createForProduction(): Checkout {
        return new Checkout(
            new ProductInMemory(),
            new CouponInMemory(),
            new OrderInMemory()
        );
    }

    static createForTest(): Checkout {
        return new Checkout(
            new ProductInMemory(),
            new CouponInMemory(),
            new OrderInMemory()
        );
    }
}
