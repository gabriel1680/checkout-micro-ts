export interface FreightGateway {
    calculateFreight(
        products: { volume: number; density: number; quantity: number }[],
        from?: string,
        to?: string
    ): Promise<number>;
}
