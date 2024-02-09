import { v4 as uuidv4 } from "uuid";
import { UserType } from "./UserType";

export const generateData = (count: number) => {
  const res: UserType[] = [];
  for (let i = 0; i < count; i++) {
    res.push({
      id: i.toString(),
      age: +Math.random().toPrecision(1) * 10,
      hobbies: ["one", "two"],
      username: "name" + i,
    });
  }
  return res;
};
