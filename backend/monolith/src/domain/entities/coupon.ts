export class Coupon {
    constructor(
        readonly code: string,
        readonly discountPercentage: number,
        readonly expireDate: Date
    ) {
        if (!this.validate()) throw new Error("Invalid Coupon");
    }

    validate(): boolean {
        if (!this.code || !this.discountPercentage || !this.expireDate)
            return false;
        if (!(this.expireDate instanceof Date)) return false;
        if (typeof this.code !== "string") return false;
        if (typeof this.discountPercentage !== "number") return false;
        return true;
    }

    isExpired(): boolean {
        return Date.now() > this.expireDate.getTime();
    }

    getDiscount(total: number) {
        return (total * this.discountPercentage) / 100;
    }
}
