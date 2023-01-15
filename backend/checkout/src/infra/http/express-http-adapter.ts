import express from "express";

import { HttpMethods, HttpServer } from "./http-server";

export class ExpressHttpAdapter implements HttpServer {
    app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    on(method: HttpMethods, url: string, callback: Function): void {
        this.app[method](
            url,
            async (req: express.Request, res: express.Response) => {
                try {
                    const output = await callback(
                        req.params,
                        req.body,
                        req.query
                    );
                    res.json(output);
                } catch (error: any) {
                    res.status(500).json({
                        message: "Internal Server Error",
                    });
                }
            }
        );
    }

    listen(port: number): void {
        this.app.listen(port);
    }
}
