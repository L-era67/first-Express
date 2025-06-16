import express, { Request, Response } from "express";
import { User } from "./types/types";

const app = express();
const port = 4200;
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    name: "Bolormaa",
    age: "18",
  });
});

app.post("/user", (req: Request, res: Response) => {
  console.log("post req", req.body);

  const { name, age } = req.body;
  //   res.send("Successfully created user")
  res.json({ message: `User ${name} is ${age}` });
});

app.put("/updateUser", (req: Request, res: Response) => {
  const { name, age }: { name: string; age: string } = req.body;
  res.send(`updated user ${name} ${age}`);
});

//Create user
app.post("/creatUser", (req: Request, res: Response) => {
  const { name, age, userName, userEmail, phoneNumber, password }: User =
    req.body;
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// app.listen(3000, ()=>{
//     console.log(`Example app listening on port http://localhost:3000`);

// })
