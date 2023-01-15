import { CouponData } from "../../../domain/data/coupon-data";
import { Coupon } from "../../../domain/entities/coupon";
import { coupons as data } from "./data";

export class CouponInMemory implements CouponData {
    constructor(readonly coupons: Coupon[] = data) {}

    async getCoupon(code: string): Promise<Coupon | null> {
        return this.coupons.find((p) => p.code === code) ?? null;
    }
}
