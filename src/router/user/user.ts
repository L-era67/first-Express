import express, { Request, Response } from "express";
import fs, { existsSync } from "fs-extra";
import { User } from "../../types/types";
import { nanoid } from "nanoid";

const userRouter = express.Router();

userRouter.post("/user", (req: Request, res: Response) => {
  console.log("post req", req.body);
  const { name, age } = req.body;
  // res.send("Successfully created useRR")
  res.json({ message: `User ${name} is ${age}` });
});

userRouter.get("/users", (req: Request, res: Response) => {
  const users = fs.readFileSync("./user.json", { encoding: "utf8", flag: "r" });
  console.log("users", users);

  res.json(JSON.parse(users));
});

userRouter.post("/createUser", (req: Request, res: Response) => {
  const { name, age, userName, userEmail, phoneNumber, password }: User =
    req.body;

  const uniqueId = nanoid();

  const filePath = "./user.json";

  let users: User[] = [];

  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath, "utf8");
    console.log("existing data:", existingData);

    if (existingData.trim().length > 0) {
      users = JSON.parse(existingData);
    }
  }
  users.push({
    name,
    age,
    userName,
    userId: uniqueId,
    userEmail,
    phoneNumber,
    password,
  });

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.send("Amjjilttai burtgegdew");
});

userRouter.delete("/deleteUser", (req: Request, res: Response) => {
  const filePathChange = "./user.json";
  const { userId }: { userId: string } = req.body;
  console.log("ID", userId);

  const users = fs.readFileSync("./user.json", "utf8");

  const arrayUsers = JSON.parse(users);
  //   console.log(typeof arrayUsers);

  const deletedUser = arrayUsers.filter((del: any) => del.userId !== userId);
  console.log("deleted user id", deletedUser);

  fs.writeFileSync(filePathChange, JSON.stringify(deletedUser, null,2)); //=>\"userId\": 0.5728839187055177,\n  user.json dr ingej gargaj irj bnda

res.send("Ustagalaa")

  //   res.send(`deleted id ${deleteId.userId}`)
});

// userRouter.put("/updateUser", (req: Request, res: Response) => {
//   const { name, age }: { name: string; age: string } = req.body;
//   res.send(`updated user ${name} ${age}`);
// });

export default userRouter;
