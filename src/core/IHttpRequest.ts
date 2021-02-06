import * as FormData from "form-data";
import { IHttpResponse } from "./IHttpResponse";

export interface IHttpRequest {
  send(param: IHttpRequestParam): Promise<IHttpResponse>
}
export interface IHttpRequestParam {
  method: string
  url: string
  body?: string | Buffer | FormData
  headers?: { [key: string]: string }
}