import express from "express";
export const app = express();
const PORT = 8000;
import axios from "axios";
import { sequelize } from "./database.js";
import bodyParser from "body-parser";
import { compilerRouter } from "./routers/compiler_router.js";
import { usersRouter } from "./routers/users_router.js";

app.use(bodyParser.json());

app.use(express.static("static"));

import session from "express-session";
app.use(
  session({
    secret: "sheeeeeeeesh",
    resave: false,
    saveUninitialized: true,
  })
);

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use("/compiler", compilerRouter);
 app.use("/users", usersRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});

