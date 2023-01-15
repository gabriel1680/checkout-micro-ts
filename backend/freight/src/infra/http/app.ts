import express from "express";

import { CalculateFreight } from "../../application/calculate-freight.use-case";
import { ZipcodeDataInMemory } from "../database/in-memory/zipcode-in-memory";
import { Controller } from "./controller";

const app = express();

app.use(express.json());

const calculateFreight = new CalculateFreight(new ZipcodeDataInMemory());
app.post("/calculate-freight", async (req, res) => {
    const controller = new Controller(res);
    try {
        const output = await calculateFreight.execute(req.body);
        return controller.ok(output);
    } catch (error: any) {
        return controller.badRequest(error.message);
    }
});

export { app };
