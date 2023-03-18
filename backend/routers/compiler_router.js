import express from "express";
import cors from "cors";
import axios from "axios";
import { Router } from "express";
export const compilerRouter = Router();

compilerRouter.use(express.static("static"));
compilerRouter.use(cors());
compilerRouter.use(express.json());

compilerRouter.post("/", (req, res) => {
  console.log("called");
  let code = req.body.code;

  let input = req.body.input;

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=true",
    headers: {
      "X-RapidAPI-Key": "d54f68f664msh4dcc91fed2cd856p1f9862jsn60ced304edec",
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
      console.error(error);
    });
});
