const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bp = require("./utils/body_parser.js");
let users = require("./data/users.json");
const path = require("path");

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  res.json(users.filter((user) => user.id == req.params.id)[0]);
});

app.post("/users", async (req, res) => {
  const newUsers = users;
  try {
    const json = await bp.bodyParser(req);
    newUsers.push(json);
    fs.writeFileSync(
      path.join(__dirname, ".", "data", "users.json"),
      JSON.stringify(newUsers),
      "utf-8"
    );
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured");
  }
});

app.put("/users/:id", async (req, res) => {
  let newUsers = users;
  try {
    const json = await bp.bodyParser(req);
    newUsers = newUsers.map((user) => {
      if(user.id == req.params.id) {
        return json;
      } else {
        return user;
      }
    })
    fs.writeFileSync(
      path.join(__dirname, ".", "data", "users.json"),
      JSON.stringify(newUsers),
      "utf-8"
    );
    res.send("Success");
  } catch (error) {
    res.json({
      "error":error
    })
  }
})

app.delete("/users/:id", (req, res) => {
  let newUsers = users;
  try {
    newUsers = newUsers.filter((e) => e.id != req.params.id);
    fs.writeFileSync(
      path.join(__dirname, ".", "data", "users.json"),
      JSON.stringify(newUsers),
      "utf-8"
    );
    res.send("Success");
  } catch (error) {
    res.json({
      "error":error
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
