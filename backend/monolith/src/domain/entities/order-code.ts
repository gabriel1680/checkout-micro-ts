export class OrderCode {
    readonly value: string;

    constructor(readonly date: Date, readonly sequence: number) {
        if (!date || !(date instanceof Date) || `${date}` === "Invalid Date")
            throw new Error("Invalid date");
        if (sequence < 0) throw new Error("Invalid sequence");
        this.value = `${date.getFullYear()}${new String(sequence + 1).padStart(
            8,
            "0"
        )}`;
    }
}
