import { Response } from "express";

export class Controller {
    constructor(private readonly res: Response) {}

    ok(body?: unknown) {
        if (body) return this.res.status(200).json(body);
        return this.res.status(200);
    }

    badRequest(message: string) {
        return this.res.status(422).json({ message });
    }
}
