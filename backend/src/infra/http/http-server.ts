export interface HttpServer {
    on(method: HttpMethods, url: string, callback: Function): void;
    listen(port: number): void;
}

export const HTTP_METHODS = [
    "get",
    "post",
    "put",
    "patch",
    "delete",
    "options",
] as const;

export type HttpMethods = typeof HTTP_METHODS[number];
