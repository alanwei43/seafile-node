
import { Response } from "node-fetch";
import { AbsHttpResponse } from "../core/IHttpResponse";

export class DefaultHttpResponse extends AbsHttpResponse {
    private readonly response: Response
    private readonly headers: Map<string, string>
    constructor(response: Response) {
        super();
        this.response = response;
        this.headers = new Map();
        Array.from(this.response.headers.keys()).forEach(key => {
            this.headers.set(key, this.response.headers.get(key) || "");
        })
    }
    async text(): Promise<string> {
        const text = await this.response.clone().text();
        return text;
    }
    async buffer(): Promise<Buffer> {
        const buf = await this.response.clone().buffer();
        return buf;
    }
    getHeaders(): Promise<Map<string, string>> {
        return Promise.resolve(this.headers);
    }
}
