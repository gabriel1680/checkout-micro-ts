import { Zipcode } from "../entities/zipcode";

export interface ZipcodeData {
    get(code: string): Promise<Zipcode | undefined>;
}
