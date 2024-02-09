import { v4 as uuidv4 } from "uuid";
import { IUser } from "../entities/users/interface/user.interface";

export const getUuid = uuidv4;

export const generateData = (count: number) => {
  const res: IUser[] = [];
  for (let i = 0; i < count; i++) {
    res.push({
      id: getUuid(),
      age: +Math.random().toPrecision(1) * 10,
      hobbies: ["one", "two"],
      username: "name" + i,
    });
  }
  return res;
};
