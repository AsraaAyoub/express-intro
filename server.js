const express = require("express");
const PORT = process.env.PORT || 3000;

const server = express();

server.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

server.get("/api", (req, res) => {
  res.send({ message: "hello world" });
});

server.get("/hello", (req, res) => {
  res.redirect("/");
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
