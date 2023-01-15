export class FreightCalculator {
    static calculate(
        volume: number,
        density: number,
        distance: number = 1000
    ): number {
        const freight = distance * volume * (density / 100);
        return freight < 10 ? 10 : Math.round(freight * 100) / 100;
    }
}
