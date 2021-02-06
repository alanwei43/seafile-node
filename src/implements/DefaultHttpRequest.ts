import { IHttpRequest, IHttpRequestParam } from "../core/IHttpRequest";
import { IHttpResponse } from "../core/IHttpResponse";
import { DefaultHttpResponse } from "./DefaultHttpResponse";
import fetch from "node-fetch";
import { Logger } from "../utils/Logger";

const logger = new Logger("DefaultHttpRequest");
export class DefaultHttpRequest implements IHttpRequest {

  async send(param: IHttpRequestParam): Promise<IHttpResponse> {
    const headers = { ...(param.headers || {}) };

    logger.debug(`Request: 
${param.method} ${param.url}
Headers: ${JSON.stringify(headers || {})}
Body: ${typeof param.body === "string" ? param.body : typeof param.body}`);

    const res = await fetch(param.url, {
      method: param.method,
      headers: headers,
      body: param.body,
    });

    const response: IHttpResponse = new DefaultHttpResponse(res);

    logger.debug(`Response 
${param.method} ${param.url}
Status: ${res.status}
Headers: ${JSON.stringify(Array.from(res.headers))}
Data: ${await response.text()}
`);

    return response;
  }
}