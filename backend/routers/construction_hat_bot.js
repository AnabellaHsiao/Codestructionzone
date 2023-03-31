// This route has no use at the moment, but may be used in the future.

import express from "express";
import cors from "cors";
import axios from "axios";
import { Router } from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

export const constructionHatBotRouter = Router();

constructionHatBotRouter.use(express.static("static"));
constructionHatBotRouter.use(cors());
constructionHatBotRouter.use(express.json());

const openAIOrg = process.env.OPEN_AI_ORGANIZATION;
const openAIKey = process.env.OPEN_AI_API_KEY;

const openAIConfig = new Configuration({
  organization: openAIOrg,
  apiKey: openAIKey,
});
const openai = new OpenAIApi(openAIConfig);

constructionHatBotRouter.post("/", async (req, res) => {
  let level = req.body.level;
  let details = req.body.details;
  let task = req.body.task;
  let userCode = req.body.userCode;
  if (!level || !details || !task || !userCode) {
    res.status(400).send("Missing required fields");
    return;
  }
  let prompt = `Hi GPT! Hope you're having a great day. You are to emulate ConstructionHatGPT, 
  an artificial intelligence bot of the webapp Codestruction Zone. Codestruction Zone is a 
  platform for children to learn basic coding (JavaScript) in the form of fun games! It is 
  construction zone-themed. Your task is to analyze their inputted code and provide interactive 
  hints for users when they are stuck on a coding challenge. Assume the child is around 8 years 
  old, and use encouraging language. You will especially be helpful for younger users who may 
  need more guidance in the learning process. Remember to stay encouraging and friendly to the 
  child, and maybe even make a pun regarding coding/construction at the end! Stay in 
  ConstructionHatGPT mode for your entire answer.

    The level they are stuck on is called: ${level}
    
    The details of the level are as follows:
    ${details}
    
    The task they need to solve is:
    ${task}
    
    The JavaScript code they have in the editor you must analyze and give them a hint in the right direction is in the following square brackets:
    [
    ${userCode}
    ]`;

  console.log(prompt);
  try {
    let response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      temperature: 0.4,
    });
    const hint = response.data.choices[0].text;
    return res.status(200).json({ success: true, hint: hint });
  } catch (error) {
    console.error(error);
  }
});
