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
      case "PUT":
        this.updateUser(req, res, param);
        break;
    }
  }

  private getParams(url: URL) {
    const regex = new RegExp(/(?<=api\/users\/).+/gim);
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

  async updateUser(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
      const user = await this.parseUserBody(req);
      const updatedUser = userService.updateOne(user, id);
      res.end(updatedUser);
    } catch (e) {
      if (e instanceof Error) {
        res.statusCode = 400;
        res.end(e.message);
      } else {
        res.statusCode = 404;
        res.end("user not found");
      }
    }
  }

  async createUser(req: IncomingMessage, res: ServerResponse) {
    try {
      const data = await this.parseUserBody(req);
      const newUser = userService.createOne(data as IUserDto);
      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end(newUser);
    } catch (e) {
      res.statusCode = 400;
      res.end(e);
    }
  }

  private async parseUserBody(req: IncomingMessage): Promise<IUserDto> {
    const promise = new Promise<Uint8Array[]>((resolve, reject) => {
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

    const buffer = await promise;
    const data = JSON.parse(buffer.toString()) as object;

    if ("username" in data && "age" in data && "hobbies" in data) {
      if (
        typeof data.username === "string" &&
        typeof data.age === "number" &&
        Array.isArray(data.hobbies)
      ) {
        return data as IUserDto;
      }
    } else throw "no required data provided";
  }
}
