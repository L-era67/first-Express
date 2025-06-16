import express from "express";

const app = express();
const port = 4200;
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    name: "Bolormaa",
    age: "18",
  });
});

app.post("/user", (req, res) => {

  console.log("post req", req.body);

  const { name, age } = req.body;
//   res.send("Successfully created user")
  res.json({ message: `User ${name} is ${age}` });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// app.listen(3000, ()=>{
//     console.log(`Example app listening on port http://localhost:3000`);

// })
