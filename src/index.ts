import { IncomingMessage, ServerResponse, createServer } from "http";
import { usersData } from "./model/usersData";
import { Buffer } from "buffer";
import { UserRouter } from "./entities/users/users.router";

createServer(function (req: IncomingMessage, res: ServerResponse) {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);

  if (reqUrl.pathname.startsWith("/api/users")) new UserRouter(req, res)

  res.end();
}).listen(80);
