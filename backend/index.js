//import library public
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
//import my library
const { checkLogin } = require("./middleware");

//import constant
const { JWTKEY } = require("./constant");

//create instance
const app = express();

//use middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 5000;

const database = [
  { gia: 15, ma: "VHM", KL: 100, san: "HOSE" },
  { gia: 25, ma: "VIC", KL: 200, san: "HNX" },
  { gia: 19, ma: "FPT", KL: 120, san: "HNX" },
];

const users = [
  {
    id: 1,
    username: "tu",
    name: "Tú đẹp trai",
    role: "admin",
    password: "123456",
  },
  {
    id: 2,
    username: "thao",
    name: "Thảo cũng đẹp trai",
    role: "president",
    password: "123456",
  },
  {
    id: 3,
    username: "beach",
    name: "Shipper",
    role: "super admin",
    password: "123456",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.filter(
    (value, index) => value.username === username && value.password === password
  );

  if (user.length !== 1) {
    res.status(400).json({
      message: "Invalid user or password",
    });
  } else {
    let token = jwt.sign(
      {
        username: user[0].username,
        role: user[0].role,
      },
      JWTKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ jwt: token });
  }
});

app.post("/get-profile", checkLogin, (req, res) => {
  const { username, role } = req.decoded;
  if (role === "admin") {
    res.status(200).json({ profile: users });
  } else {
    const user = users.filter((value, index) => value.username === username);
    res.status(200).json({ profile: user });
  }
});

app.post("/get-data", (req, res) => {
  res.status(200).json(database);
});

app.post("/add-data", (req, res) => {
  const data = req.body;
  if (data) {
    database.push(data);
  }
  res.status(200).json(database);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
