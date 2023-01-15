export interface HttpClient {
    get<O>(url: string): Promise<O[]>;
    post<I, O>(url: string, data: I): Promise<O>;
}
