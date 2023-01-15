import { Checkout } from "../../application/checkout/checkout.use-case";
import { CLIHandler } from "./cli-handler";

export class CLIController {
    constructor(readonly handler: CLIHandler, readonly checkout: Checkout) {
        const input: TInput = {
            cpf: "",
            items: [],
        };

        handler.on("set-cpf", function (params: string) {
            input.cpf = params;
        });

        handler.on("add-item", function (params: string) {
            const [productId, quantity] = params.split(" ");
            input.items.push({
                productId: parseInt(productId),
                quantity: parseInt(quantity),
            });
        });

        handler.on("checkout", async function (params: string) {
            try {
                const output = await checkout.execute(input);
                handler.write(JSON.stringify(output, undefined, 2));
            } catch (error) {
                handler.write(JSON.stringify(error, undefined, 2));
            }
        });
    }
}

type TInput = {
    cpf: string;
    items: {
        productId: number;
        quantity: number;
    }[];
};
