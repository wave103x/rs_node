import { IncomingMessage, ServerResponse } from "http";
import { Urls } from "../../constants/Urls";
import { userService } from "./user.service";

export class UserRouter {
  constructor(req: IncomingMessage, res: ServerResponse) {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const param = this.getParams(reqUrl);

    switch (req.method) {
      case "GET":
        if (param) {
          this.getUser(req, res, param);
          return;
        }
        this.getUsers(req, res);
        break;
    }
  }

  private getParams(url: URL) {
    const regex = new RegExp(/(?<=api\/users\/)\d+/gim);
    const param = url.pathname.match(regex);
    return param && param[0];
  }

  getUser(req: IncomingMessage, res: ServerResponse, id: string) {
    res.statusCode = 200;
    res.write(userService.findOne(id));
  }

  getUsers(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 200;
    res.write(userService.findAll());
  }
}
