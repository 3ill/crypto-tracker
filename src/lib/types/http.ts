export type THttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface IHttpClientOptions {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  retries?: number;
  timeoutMs?: number;
  logRequests?: boolean;
}

export interface IRequest {
  url: string;
  body?: unknown;
  headers?: Record<string, string>;
  method: THttpMethod;
}
