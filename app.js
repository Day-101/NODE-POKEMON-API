import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello express!"));

app.listen(port, () =>
  console.log(
    `Application lauched on : http://localhost:${port}`
  )
);
