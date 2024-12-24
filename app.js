const express = require("express");
const path = require("path");
const userModel = require("./Utils/user-model");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const PORT = 3001;

app.set("view engine", "ejs"); // defining  view engine for ejs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// Index Page

app.get("/", (req, res) => {
  res.render("index");
});

// Update Page and sending user to the frontend for editing

app.get("/update/:userid", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.userid });

  res.render("update", { user });
});

// updating the user

app.post("/edit/:userid", async (req, res) => {
  let { UserName, Registration, Course, Semester } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.userid },
    { UserName, Registration, Course, Semester },
    { new: true }
  );

  res.redirect("/users");
});

// deleting the user

app.get("/delete/:userid", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.userid });

  res.redirect("/users");
});

// Showing all the users

app.get("/users", async (req, res) => {
  let users = await userModel.find();

  res.render("users", { users });
});

// Creating the user

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
