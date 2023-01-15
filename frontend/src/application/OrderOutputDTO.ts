export interface OrderOutputDTO {
    cpf: string;
    items: { id: number; quantity: number }[];
}
