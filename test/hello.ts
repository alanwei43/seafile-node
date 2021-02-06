import fetch from "node-fetch";
import { User } from "./config/user";

(async () => {
  const res = await fetch("https://cloud.seafile.com/api2/auth-token/", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(User)
  });
  const data = await res.json();
  console.log(data);
})();