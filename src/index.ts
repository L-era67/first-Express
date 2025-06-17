import express, { Request, Response } from "express";
// import fs from "fs-extra";
// import { User } from "./types/types";
import userRouter from "./router/user/user";

const app = express();
const port = 3000;
app.use(express.json());



app.use("/", userRouter);

app.get("/", (req:Request, res:Response) => {
  res.send({
    name: "Bolormaa",
    age: "18",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
