const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const UserModel = require("./models/User");

dotenv.config();
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) throw err;
      res.json({
        userData,
      });
    });
  }else{
    res.status(401).json("No token")
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const createdUser = await UserModel.create({ username, password });
  jwt.sign(
    { userId: createdUser._id, username },
    process.env.JWT_SECRET,
    {},
    (err, token) => {
      if (err) throw err;
      res
        .cookie("token", token, { sameSite: "none", secure: true })
        .status(201)
        .json({
          id: createdUser._id,
        });
    }
  );
});

app.listen(4040);

//KSGBlrv4E8AumCFV
