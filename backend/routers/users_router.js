import { User } from "../models/user.js";
import { Router } from "express";
import express from "express";

import axios from "axios";

import multer from "multer";
import bcrypt from "bcrypt";
import path from "path";
export const usersRouter = Router();

usersRouter.post("/signup", async (req, res) => {
  let password = req.body.password;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  password = bcrypt.hashSync(password, salt);

  const user = User.build({
    username: req.body.username,
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
