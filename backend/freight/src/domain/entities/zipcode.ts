import { Coord } from "./coord";

export class Zipcode {
    coord: Coord;

    constructor(
        readonly code: string,
        readonly street: string,
        readonly neighborhood: string,
        readonly lat: number,
        readonly long: number
    ) {
        this.coord = new Coord(this.lat, this.long);
    }
}
