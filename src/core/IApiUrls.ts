export interface IApiUrls {
  Ping(): string
  AuthToken(): string
  AccountInfo(): string
  ServerInfo(): string
  Repos(): string
  GetRepo(repoId: string): string
  CreateRepo(): string
  DeleteRepo(repoId: string): string
  CreateFile(repoId: string, path: string): string
  UploadLink(repoId: string): string
}