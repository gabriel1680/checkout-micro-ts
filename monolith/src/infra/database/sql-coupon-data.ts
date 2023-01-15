import pgp from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

import { CouponData } from "../../domain/data/coupon-data";
import { Coupon } from "../../domain/entities/coupon";

export class SQLCouponData implements CouponData {
    connection: pg.IClient;

    constructor() {
        this.connection = pgp()("postgres://cccat9@123:4532/app");
    }

    async getCoupon(code: string): Promise<Coupon | null> {
        const couponData = (await this.connection.query(
            "SELECT * FROM cccat9.coupons WHERE code = $1",
            [code]
        )) as any;
        if (!couponData) return null;
        return new Coupon(
            couponData.code,
            parseFloat(couponData.percentage_discount),
            new Date(couponData.expire_date)
        );
    }
}
