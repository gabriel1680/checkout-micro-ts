import { Coupon } from "./coupon";
import { Cpf } from "./cpf";
import { Item } from "./item";
import { OrderCode } from "./order-code";
import { Product } from "./product";

export class Order {
    private readonly _code: OrderCode;
    private readonly _cpf: Cpf;
    readonly items: Item[] = [];
    private _coupon?: Coupon;

    constructor(cpf: string, date: Date = new Date(), sequence: number = 0) {
        this._cpf = new Cpf(cpf);
        this._code = new OrderCode(date, sequence);
    }

    addItem(product: Product, quantity: number) {
        if (this.items.some((i) => i.productId === product.id))
            throw new Error("Duplicated product");
        this.items.push(new Item(product.id, product.price, quantity));
    }

    addCoupon(coupon: Coupon) {
        if (!coupon.isExpired()) this._coupon = coupon;
    }

    total(): number {
        let total = 0;
        for (const item of this.items) total += item.total();
        if (this._coupon) total -= this._coupon.getDiscount(total);
        return total;
    }

    code(): string {
        return this._code.value;
    }

    cpf(): string {
        return this._code.value;
    }

    coupon(): Coupon | null {
        return this._coupon ?? null;
    }
}
