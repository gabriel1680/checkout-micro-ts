import { ZipcodeData } from "../../../domain/data/zipcode-data";
import { Zipcode } from "../../../domain/entities/zipcode";

export class ZipcodeDataInMemory implements ZipcodeData {
    entries: { [code: string]: Zipcode };

    constructor() {
        this.entries = {
            "22030060": new Zipcode("22030060", "", "", -27.5945, -48.5477),
            "88015600": new Zipcode("88015600", "", "", -22.9192, -43.2003),
        };
    }

    async get(code: string): Promise<Zipcode | undefined> {
        return this.entries[code];
    }
}
