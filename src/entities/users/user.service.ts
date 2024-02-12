import { IUser } from "./interface/user.interface";
import { IUserDto } from "./dto/user.dto";
import UuidService from "./lib/uuid.service";

class UserService {
  constructor(private users: IUser[] = UuidService.generateData(4)) {}

  findAll() {
    return Buffer.from(JSON.stringify(this.users));
  }

  findOne(id: string): Buffer {
    const user = this.users.find((item) => item.id === id);
    if (user) return Buffer.from(JSON.stringify(user));
    throw new Error("no user found");
  }

  deleteOne(id: string) {
    if (!UuidService.isUudid(id)) throw new Error("invalid data provided");

    const userIdx = this.users.findIndex((item) => item.id === id);

    if (userIdx === -1) throw "no user found with provided Id";

    this.users.splice(userIdx, 1);
  }

  updateOne(body: IUserDto, id: string) {
    if (!UuidService.isUudid(id)) throw new Error("invalid data provided");

    const userIdx = this.users.findIndex((item) => item.id === id);

    if (userIdx === -1) throw "no user found with provided Id";

    const updatedUser: IUser = {
      ...body,
      id,
    };
    this.users.splice(userIdx, 1, updatedUser);
    return Buffer.from(JSON.stringify(updatedUser));
  }

  createOne(body: IUserDto) {
    const newUser: IUser = {
      ...body,
      id: UuidService.getUuid(),
    };
    this.users.push(newUser);
    return Buffer.from(JSON.stringify(newUser));
  }
}

export const userService = new UserService();
