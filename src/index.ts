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


//Create user


// app.get("/users", (req:Request, res:Response)=>{

  
//   const users = fs.readFileSync("./user.json", {encoding: "utf8", flag:"r"});
//   console.log("users", users);
  
//   res.json(JSON.parse(users));
// })

// app.delete("/delete", (req:Request, res:Response)=>{})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
