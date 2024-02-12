import { v4 as uuidv4, validate } from "uuid";
import { IUser } from "../interface/user.interface";

export default class UuidService {
  static getUuid = uuidv4;

  static isUudid = (id: string): boolean => validate(id);

  static generateData = (count: number) => {
    const res: IUser[] = [];
    for (let i = 0; i < count; i++) {
      res.push({
        id: this.getUuid(),
        age: +Math.random().toPrecision(1) * 10,
        hobbies: ["one", "two"],
        username: "name" + i,
      });
    }
    return res;
  };
}
