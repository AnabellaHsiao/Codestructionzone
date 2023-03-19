import { User } from "../models/user.js";
import { Router } from "express";
import express from "express";

import axios from "axios";

import multer from "multer";
import bcrypt from "bcrypt";
import path from "path";
export const usersRouter = Router();

usersRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  let password = req.body.data.password;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  password = bcrypt.hashSync(password, salt);

  const user = User.build({
    username: req.body.data.email,
    password,
    level: 1,
  });

  try {
    await user.save();
  } catch {
    return res.status(422).json({ error: "User already exists" });
  }
  return res.json({
    username: user.username,
  });
});

usersRouter.post("/signin", async (req, res) => {
  let password = req.body.data.password;
  console.log(req.body.data);

  //invalid input
  if (!req.body.data.email || !req.body.data.password) {
    return res.status(401).json({ error: "Invalid input." });
  }

  let user = await User.findOne({
    where: {
      username: req.body.data.email,
    },
  });

  if (user === null) {
    return res.status(401).json({ error: "Incorrect username " });
  }
  // console.log("user"+user.username+"\n");
  const result = bcrypt.compareSync(password, user.password);

  // password incorrect
  if (!result) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  req.session.userId = user.userId;
  req.session.username = user.username;
  req.session.save(() => {
    console.log("session : " + req.session.username + "\n");
    let username = req.session.username;
    //redirect to home page
    return res.status(200).json({ username: username, status: "success" });
  });
});

//Get Username
usersRouter.get("/me", async (req, res) => {
  console.log("here", req.session);
  if (!req.session.username || !req.session.userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  let user = {
    username: req.session.username,
  };
  // TODO: implement a route that returns the user's info from the database
  return res.json({ username: req.session.username });
});
