import express from "express";

import { CheckoutFactory } from "../../application/checkout/checkout-factory";
import { Controller } from "./controller";

const app = express();

app.use(express.json());

app.post("/checkout", async (req, res) => {
    const controller = new Controller(res);
    const checkout = CheckoutFactory.createForProduction();
    try {
        const output = await checkout.execute(req.body);
        return controller.ok(output);
    } catch (error: any) {
        return controller.badRequest(error.message);
    }
});

export { app };
