import { IncomingMessage, ServerResponse, createServer } from "http";
import "dotenv/config";
import { UserController } from "./entities/users/users.controller";

createServer(function (req: IncomingMessage, res: ServerResponse) {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (reqUrl.pathname.startsWith("/api/users")) new UserController(req, res);
    else if (!reqUrl.pathname.startsWith("/api/users")) {
      res.statusCode = 404;
      res.end("invalid url");
    }
  } catch {
    res.statusCode = 500;
    res.end();
  }
}).listen(process.env.PORT);