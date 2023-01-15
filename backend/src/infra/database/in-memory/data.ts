import { Coupon } from "../../../domain/entities/coupon";
import { Product } from "../../../domain/entities/product";

export const products = [
    new Product(1, "A", 22, 20, 15, 10, 0.9),
    new Product(2, "B", 30, 100, 30, 10, 3),
    new Product(3, "C", 45, 200, 100, 50, 40),
];

export const coupons = [
    new Coupon("VALE20", 20, new Date("2023-11-26")),
    new Coupon("VALE60", 60, new Date("2018-11-21")),
];
