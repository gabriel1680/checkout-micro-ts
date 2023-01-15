import { CouponData } from "../domain/data/coupon-data";

export class ValidateCoupon {
    constructor(private readonly couponData: CouponData) {}

    async execute(input: Input): Promise<Output> {
        const coupon = await this.couponData.getCoupon(input.coupon);
        if (!coupon) return { isValid: false };
        return { isValid: !coupon.isExpired() };
    }
}

interface Input {
    coupon: string;
}

interface Output {
    isValid: boolean;
}
