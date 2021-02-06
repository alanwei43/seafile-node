import { IApiUrls } from "./IApiUrls";
import { IHttpRequest, IHttpRequestParam } from "./IHttpRequest";

declare type StringResponse = string | { error_msg: string }

interface ResponseResult<T> {
  success: boolean
  data?: T
  error?: string
}

export class SeafileCore {
  token: string
  constructor(private urls: IApiUrls, private request: IHttpRequest) {
  }

  async ping(): Promise<string> {
    const response = await this.request.send({
      method: "GET",
      url: this.urls.Ping(),
      headers: {
        "Authorization": "Token " + this.token
      }
    });
    return response.text();
  }

  async initAuthToken(user: { username: string, password: string }) {
    const token = await this.getAuthToken(user.username, user.password);
    this.token = token;
  }
  async updateAuthToken(token: string) {
    this.token = token;
  }

  async getAuthToken(username: string, password: string): Promise<string> {
    const result = await this.json<{ token: string }>(this.urls.AuthToken(), "POST", {
      username, password
    });
    return result.token;
  }

  async getAccountInfo(): Promise<{ usage: number, total: number, email: string }> {
    return await this.json(this.urls.AccountInfo());
  }
  async getServerInfo(): Promise<{ version: string, features: Array<string> }> {
    return await this.json(this.urls.ServerInfo());
  }
  async getRepoList(): Promise<Array<{ "permission": string, "encrypted": boolean, "mtime": number, "owner": string, "id": string, "size": number, "name": string, "type": string, "virtual": boolean, "desc": string, "root": string }>> {
    return await this.json(this.urls.Repos());
  }
  async getRepoInfo(repoId: string): Promise<{ "permission": string, "encrypted": boolean, "mtime": number, "owner": string, "id": string, "size": number, "name": string, "type": string, "virtual": boolean, "desc": string, "root": string }> {
    return await this.json(this.urls.GetRepo(repoId));
  }
  async createRepo(repo: { name: string, desc?: string, passwd?: string }): Promise<{ "encrypted": string, "enc_version": number, "repo_id": string, "magic": string, "relay_id": string, "repo_version": number, "relay_addr": string, "token": string, "relay_port": string, "random_key": string, "email": string, "repo_name": string }> {
    return await this.json(this.urls.CreateRepo(), "POST", repo);
  }
  async deleteRepo(repoId: string): Promise<ResponseResult<string>> {
    const result: StringResponse = await this.json(this.urls.DeleteRepo(repoId), "DELETE");
    return this.convertStringResponse(result);
  }
  async createFile(repoId: string, path: string) {
    const url = this.urls.CreateFile(repoId, path);
    const response = await this.request.send({
      method: "POST",
      url: url,
      body: JSON.stringify({ operation: "create" }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.token}`
      }
    });
    return response.json();
  }
  async getFileUploadLink(repoId: string): Promise<ResponseResult<string>> {
    const response: StringResponse = await this.json(this.urls.UploadLink(repoId), "GET");
    return this.convertStringResponse(response);
  }


  private async json<T>(url: string, method?: "GET" | "POST" | "DELETE", data?: any): Promise<T> {
    const params: IHttpRequestParam = {
      "method": method || "GET",
      "url": url,
      headers: {
        Accept: "application/json; charset=utf-8; indent=4",
        "Content-Type": "application/json",
      }
    };
    if (typeof this.token === "string" && this.token.length) {
      params.headers.Authorization = `Token ${this.token}`;
    }
    if (data) {
      params.body = JSON.stringify(data);
    }
    const response = await this.request.send(params);
    return response.json<T>();
  }

  private convertStringResponse(response: StringResponse): ResponseResult<string> {
    if (typeof response === "string") {
      return {
        success: true,
        data: response
      }
    } else {
      return {
        success: false,
        error: response.error_msg
      };
    }
  }
}
