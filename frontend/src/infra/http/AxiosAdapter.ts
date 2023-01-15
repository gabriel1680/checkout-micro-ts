import axios from "axios";
import { HttpClient } from "./HttpClient";

export class AxiosAdapter implements HttpClient {
    async get<O>(url: string): Promise<O[]> {
        const response = await axios.get(url);
        return response.data;
    }

    async post<I, O>(url: string, data: I): Promise<O> {
        const response = await axios.post(url, data);
        return response.data;
    }
}
