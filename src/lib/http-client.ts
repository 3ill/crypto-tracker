import { IHttpClientOptions, IRequest } from "./types/http";

export class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private retries: number;
  private timeoutMs: number;
  private logRequests: boolean;

  constructor(options: IHttpClientOptions) {
    this.baseUrl = options.baseUrl;
    this.defaultHeaders = options.defaultHeaders || {};
    this.retries = options.retries || 3;
    this.timeoutMs = options.timeoutMs || 10000;
    this.logRequests = options.logRequests || false;
  }

  async get<T>(args: Pick<IRequest, "headers" | "path">): Promise<T> {
    return await this.request<T>({
      method: "GET",
      path: args.path,
      headers: args.headers,
    });
  }

  async post<T>(args: Pick<IRequest, "headers" | "path" | "body">): Promise<T> {
    return await this.request<T>({
      method: "POST",
      path: args.path,
      headers: args.headers,
      body: args.body,
    });
  }

  private urlFactory(path: string) {
    return `${this.baseUrl}${path}`;
  }

  private async request<T>(args: IRequest): Promise<T> {
    const { method, path, body, headers } = args;
    const url = this.urlFactory(path);
    let attempt: number = 0;

    while (attempt < this.retries) {
      try {
        if (this.logRequests) {
          console.log(`[HTTP ${method}] ${url}`);
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

        const res = await fetch(url, {
          method,
          headers: {
            ...this.defaultHeaders,
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) {
          throw new Error(`Request Failed: ${res.status}`, {
            cause: await res.text(),
          });
        }

        return await res.json();
      } catch (err) {
        if (attempt > this.retries) {
          throw err;
        }

        const delay = Math.pow(2, attempt) * 100;
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++;
      }
    }

    throw new Error(`Max retries exceeded: unable to fetch data`);
  }
}
