const express = require("express");
const path = require("path");
const userModel = require("./Utils/user-model");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/update/:userid", async (req, res) => {

  let user = await userModel.findOne({_id: req.params.userid});

  res.render("update", {user});
});

app.get("/Delete/:userid", (req, res) => {
  res.redirect("/users");
});


app.get("/users", async (req, res) => {
  let users = await userModel.find();

  res.render("users", { users: users });
});

app.post("/create", async (req, res) => {
  let { UserName, Registration, Course, Semester } = req.body;

  let CreateUser = await userModel.create({
    UserName: UserName,
    Registration: Registration,
    Course: Course,
    Semester: Semester,
  });

  res.redirect("/users");
});

app.listen(PORT);
