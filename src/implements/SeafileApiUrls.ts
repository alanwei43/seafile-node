import { IApiUrls } from "../core/IApiUrls";

export class SeafileApiUrls implements IApiUrls {
  ServerInfo = () => "https://cloud.seafile.com/api2/server-info/";
  AccountInfo = () => "https://cloud.seafile.com/api2/account/info/";
  AuthToken = () => "https://cloud.seafile.com/api2/auth-token/";
  Ping = () => "https://cloud.seafile.com/api2/ping/";
  Repos = () => "https://cloud.seafile.com/api2/repos/";
  GetRepo = (repoId: string) => `https://cloud.seafile.com/api2/repos/${repoId}/`;
  CreateRepo = () => `https://cloud.seafile.com/api2/repos/`;
  DeleteRepo = (repoId: string) => `https://cloud.seafile.com/api2/repos/${repoId}/`
  CreateFile = (repoId: string, path: string) => `https://cloud.seafile.com/api2/repos/${repoId}/file/?p=${encodeURIComponent(path)}`
  UploadLink = (repoId: string) => `https://cloud.seafile.com/api2/repos/${repoId}/upload-link/`;
}