import { SeafileCore } from "../src/core/SeafileCore";
import { DefaultHttpRequest } from "../src/implements/DefaultHttpRequest";
import { SeafileApiUrls } from "../src/implements/SeafileApiUrls";
import { Token } from "./config/user"

const log = (msg: any) => console.log(msg, `\n\n----------\n`);

(async () => {
  const urls = new SeafileApiUrls();
  const request = new DefaultHttpRequest();
  const instance = new SeafileCore(urls, request);
  await instance.updateAuthToken(Token);
  log(await instance.ping());
  log(await instance.getAccountInfo());
  log(await instance.getServerInfo());
  log(await instance.getRepoList());
  log(await instance.getRepoInfo("716a1ba6-d115-4f8f-8c9f-ab5e00f3f1f6"));
  // log(await instance.createRepo({ name: "test-repo", desc: "hello world" }));
  log(await instance.deleteRepo("7705b4c9-9d94-474e-be69-b889534d6602"));
  log(await instance.createFile("716a1ba6-d115-4f8f-8c9f-ab5e00f3f1f6", "/"));
  const uploadLink = await instance.getFileUploadLink("716a1ba6-d115-4f8f-8c9f-ab5e00f3f1f6");
  console.log(uploadLink);
})();