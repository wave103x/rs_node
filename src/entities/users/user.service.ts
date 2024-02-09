import { IUser } from "./interface/user.interface";
import { generateData, getUuid } from "../../model/generateData";
import { IUserDto } from "./dto/user.dto";

class UserService {
  constructor(private users: IUser[] = generateData(10)) {}

  findAll() {
    return Buffer.from(JSON.stringify(this.users));
  }

  findOne(id: string): Buffer {
    const user = this.users.find((item) => item.id === id);
    if (user) return Buffer.from(JSON.stringify(user));
    throw new Error("no user found");
  }

  createOne(body: IUserDto) {
    const newUser: IUser = {
      ...body,
      id: getUuid(),
    };
    this.users.push(newUser);
    return Buffer.from(JSON.stringify(newUser));;
  }
}

export const userService = new UserService();
