import { IncomingMessage, ServerResponse } from "http";
import { userService } from "./user.service";
import { IUserDto } from "./dto/user.dto";

export class UserController {
  constructor(req: IncomingMessage, res: ServerResponse) {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const param = this.getParams(reqUrl);

    switch (req.method) {
      case "GET":
        if (param) {
          this.getUser(req, res, param);
          break;
        }
        this.getUsers(req, res);
        break;
      case "POST":
        this.createUser(req, res);
        break;
    }
  }

  private getParams(url: URL) {
    const regex = new RegExp(/(?<=api\/users\/)\d+/gim);
    const param = url.pathname.match(regex);
    return param && param[0];
  }

  getUser(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
      const user = userService.findOne(id);
      res.statusCode = 200;
      res.end(user);
    } catch (e) {
      res.statusCode = 404;
      if (e instanceof Error) {
        res.end(e.message);
      } else res.end("no user found");
    }
  }

  getUsers(req: IncomingMessage, res: ServerResponse) {
    try {
      res.statusCode = 200;
      res.end(userService.findAll());
    } catch (e) {
      res.statusCode = 404;
      if (e instanceof Error) {
        res.end(e.message);
      } else res.end("no user found");
    }
  }

  async createUser(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const dataRaw = await this.parseBody(req);
    res.end('dd')
    const dataString = dataRaw.toString()
    const data = JSON.parse(dataString) as object;
    if ('username' in data && 'age' in data && 'hobbies' in data) {
      if (typeof data.username === 'string' && typeof data.age === 'number' && Array.isArray(data.hobbies) ) {
        const newUser = userService.createOne(data as IUserDto);
      }
    }
  }

  private async parseBody(req: IncomingMessage): Promise<Uint8Array[]> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];

      req.on("data", (chunk) => {
        chunks.push(chunk);
      });

      req.on("end", () => {
        resolve(chunks);
      });

      req.on("error", (err) => {
        reject(err);
      });
    });
  }
}
