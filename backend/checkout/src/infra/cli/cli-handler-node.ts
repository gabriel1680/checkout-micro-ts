import { CLIHandler } from "./cli-handler";

export class CLIHandlerNode extends CLIHandler {
    constructor() {
        super();
        process.stdin.on("data", (chunk) => {
            const text = chunk.toString().replace(/\n/g, "");
            this.type(text);
        });
    }

    write(text: string): void {
        console.log(text);
    }
}
