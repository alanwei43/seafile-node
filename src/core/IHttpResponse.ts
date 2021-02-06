import * as fs from "fs";
import { promisify } from "util";
import { pipeline, Readable } from "stream";

export interface IHttpResponse {
  text(): Promise<string>
  buffer(): Promise<Buffer>
  getHeaders(): Promise<Map<string, string>>
  getHeader(name: string): Promise<string>
  json<T>(): Promise<T>
  save(dest: string): Promise<void>
}

export abstract class AbsHttpResponse implements IHttpResponse {
  abstract getHeaders(): Promise<Map<string, string>>
  abstract text(): Promise<string>
  abstract buffer(): Promise<Buffer>
  async getHeader(name: string): Promise<string> {
    const headers = await this.getHeaders();
    return headers.get(name) || "";
  }

  async json<T>(): Promise<T> {
    const text = await this.text();
    try {
      return JSON.parse(text.split("\n").join(""));
    } catch (err) {
      console.warn(`JSON序列化失败: ${text}`);
      return Promise.reject(err);
    }
  }
  async save(dest: string): Promise<void> {
    const input = new Readable();
    const buf = await this.buffer();
    input.push(buf);
    input.push(null);
    await promisify(pipeline)(input, fs.createWriteStream(dest));
  }
}