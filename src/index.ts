import { IncomingMessage, ServerResponse, createServer } from "http";
import { UserController } from "./entities/users/users.controller";

createServer(function (req: IncomingMessage, res: ServerResponse) {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);

  if (reqUrl.pathname.startsWith("/api/users")) new UserController(req, res)
}).listen(80);
