export class Order {
    items: any[];
    code: string = "";
    total: number = 0;

    constructor(readonly cpf: string) {
        this.items = [];
    }

    addItem(product: any) {
        const itemAlreadyAdded = this.items.find(
            (i: any) => i.id === product.id
        );
        if (!itemAlreadyAdded) {
            this.items.push({
                id: product.id,
                price: product.price,
                quantity: 1,
            });
        } else {
            itemAlreadyAdded.quantity++;
        }
    }

    increaseItem(id: number) {
        const itemAlreadyExists = this.items.find((i: any) => i.id === id);
        if (!itemAlreadyExists) return;
        itemAlreadyExists.quantity++;
    }

    decreaseItem(id: number) {
        const itemAlreadyExists = this.items.find((i: any) => i.id === id);
        if (!itemAlreadyExists) return;
        itemAlreadyExists.quantity--;
        if (itemAlreadyExists.quantity === 0)
            this.items.splice(this.items.findIndex((i: any) => i.id === id));
    }

    getTotal() {
        return this.items.reduce(
            (total: number, item: any) => (total += item.price * item.quantity),
            0
        );
    }
}
