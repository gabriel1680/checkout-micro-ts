import { Order } from "../src/domain/Order";
import { Product } from "../src/domain/Product";

test("should be able to create new empty order", () => {
    const order = new Order("111.111.111-11");
    expect(order.getTotal()).toBe(0);
});

test("should be able to create order with 3 items", () => {
    const order = new Order("111.111.111-11");
    order.addItem(new Product(1, "A", 1000));
    order.addItem(new Product(2, "B", 5000));
    order.addItem(new Product(3, "C", 300));
    expect(order.getTotal()).toBe(6300);
});

test("should be able to create order with same item", () => {
    const order = new Order("111.111.111-11");
    order.addItem(new Product(1, "A", 1000));
    order.addItem(new Product(1, "A", 1000));
    order.addItem(new Product(1, "A", 1000));
    expect(order.getTotal()).toBe(3000);
    expect(order.items).toHaveLength(1);
    expect(order.items[0].quantity).toBe(3);
});
