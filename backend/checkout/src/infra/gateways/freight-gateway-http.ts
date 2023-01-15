import axios from "axios";

import { FreightGateway } from "../../application/gateways/freight-gateway";

export class FreightGatewayHttp implements FreightGateway {
    async calculateFreight(
        products: { volume: number; density: number; quantity: number }[],
        from?: string | undefined,
        to?: string | undefined
    ): Promise<number> {
        const response = await axios.post(
            "http://localhost:3334/calculate-freight",
            { products, from, to }
        );
        const freightData = response.data;
        return freightData.freight;
    }
}
