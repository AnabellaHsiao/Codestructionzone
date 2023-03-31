import express from "express";
import cors from "cors";
import axios from "axios";
import { Router } from "express";
import * as dotenv from "dotenv";
dotenv.config();

export const compilerRouter = Router();

compilerRouter.use(express.static("static"));
compilerRouter.use(cors());
compilerRouter.use(express.json());

const judge0ApiKey = process.env.JUDGE_0_API_KEY;

compilerRouter.post("/", (req, res) => {
  let code = req.body.code;

  let input = req.body.input;

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=true",
    headers: {
      "X-RapidAPI-Key": judge0ApiKey,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      source_code: code,
      language_id: 63,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      if (error.response.status === 429) {
        res.status(429).send("Too many requests");
      }
    });
});
