import { Coupon } from "../entities/coupon";

export interface CouponData {
    getCoupon(code: string): Promise<Coupon | null>;
}
