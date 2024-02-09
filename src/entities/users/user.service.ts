import { UserType } from "../../model/UserType";
import { generateData } from "../../model/generateData";

class UserService {
  constructor(private users: UserType[] = generateData(10)) {}

  findAll() {
    return Buffer.from(JSON.stringify(this.users));
  }

  findOne(id: string): Buffer {
    try {
      const user = this.users.find((item) => item.id === id);
      if (user) return Buffer.from(JSON.stringify(user));
    } catch {
      throw new Error("no user find");
    }
  }
}

export const userService = new UserService();
