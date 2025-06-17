import express, { Request, Response } from "express";
import fs, { existsSync } from "fs-extra";
import { User } from "../../types/types";
import { nanoid } from "nanoid";

const userRouter = express.Router();

//HEREGLEGCHDIIN MEDEELLUUD AWAH
userRouter.get("/users", (req: Request, res: Response) => {
  const users = fs.readFileSync("./user.json", { encoding: "utf8", flag: "r" });
  console.log("users", users);

  res.json(JSON.parse(users));
});

//CREATE USER
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

  res.send("Amjilttai burtgegdlee");
});

//DELETE USER
userRouter.delete("/deleteUser", (req: Request, res: Response) => {
  const filePathChange = "./user.json";
  const { userId }: { userId: string } = req.body;
  const users = fs.readFileSync("./user.json", "utf8");
  const arrayUsers = JSON.parse(users);

  const deletedUser = arrayUsers.filter((del: any) => del.userId !== userId);
  console.log("DELETED USER ID", deletedUser);

  console.log("ustagalaa", deletedUser.length);
  console.log("ARRAY", arrayUsers.length);

  if (deletedUser.length !== arrayUsers.length) {
    fs.writeFileSync(filePathChange, JSON.stringify(deletedUser, null, 2));
    res.send("Ustgagdsan");
  } else if (!userId) {
    res.send("user ID oruulna uu!");
  } else {
    res.send("iim user ID-tai hereglegch obsoyoo");
  }
});

//UPDATED USER ID
userRouter.put("/updateUser", (req: Request, res: Response) => {
  const { name, age, userId }: { name: string; age: string; userId: string } =
    req.body;
  const users = fs.readFileSync("./user.json", "utf8");
  const filePathChange = "./user.json";

  const parsedUsers = JSON.parse(users);
  console.log(Array.isArray(parsedUsers)); //massiv esehiig shalgan T or F

  const updatedUsers = parsedUsers.map((updatedUser: any) => {
    if (updatedUser.userId === userId) {
      return { ...updatedUser, name: name, age: age };
    } else if (updatedUser.userId !== userId) {
      return updatedUser;
    }
    // return updatedUser;
  });
  console.log("USERS", users);

  // const updatedUsers = parsedUsers.map((user: any)=> {
  //   if(user.userId!==updatedUser.userId){
  //     return {...users, }
  //   }
  // })

  res.json({ "updated user": updatedUsers });
  fs.writeFileSync(filePathChange, JSON.stringify(updatedUsers, null, 2));
});

export default userRouter;
