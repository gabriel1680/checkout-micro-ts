export class Item {
    constructor(
        readonly productId: number,
        readonly price: number,
        readonly quantity: number
    ) {
        if (quantity <= 0) throw new Error("Invalid item quantity");
    }

    total(): number {
        return this.price * this.quantity;
    }
}
