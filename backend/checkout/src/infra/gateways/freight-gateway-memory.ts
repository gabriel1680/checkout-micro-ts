import { FreightGateway } from "../../application/gateways/freight-gateway";

export class FreightGatewayMemory implements FreightGateway {
    async calculateFreight(
        products: { volume: number; density: number; quantity: number }[],
        from?: string | undefined,
        to?: string | undefined
    ): Promise<number> {
        return 0;
    }
}
