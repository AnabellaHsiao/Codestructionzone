import express from "express";
import { sequelize } from "./database.js";
import bodyParser from "body-parser";
import { compilerRouter } from "./routers/compiler_router.js";
import { usersRouter } from "./routers/users_router.js";
import { constructionHatBotRouter } from "./routers/construction_hat_bot.js";
import http from "http";
import { Server } from "socket.io";

export const app = express();

const PORT = 8000;

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
app.use("/construction-hat-bot", constructionHatBotRouter);

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const rooms = {};
const isRoomFull = (roomId) => {
  return rooms[roomId] && rooms[roomId].playerCount === 2;
};

io.on("connection", (socket) => {
  console.log("A mini user connected!");

  // Join a room
  socket.on("join room", (roomId) => {
    if (!isRoomFull(roomId)) {
      console.log(`Mini user ${socket.id}: ` + roomId);
      socket.join(roomId);
      if (!rooms[roomId]) {
        rooms[roomId] = {
          playerCount: 1,
          players: [socket.id],
        };
      } else {
        rooms[roomId].playerCount++;
        rooms[roomId].players.push(socket.id);
      }
      io.to(roomId).emit("Mini user joined", rooms[roomId].players);
      // Notify the player if they are player 1 or 2
      socket.emit("player number", rooms[roomId].playerCount);
    } else {
      console.log("Room is full! Mini user " + socket.id + " cannot join.");
      socket.emit("room full", "Room is full!");
    }
  });

  // Leave a room
  socket.on("leave room", (roomId) => {
    console.log(`Mini user ${socket.id}: left` + roomId);
    socket.leave(roomId);
    // Remove the user from the room, decrement the player count
    rooms[roomId].players = rooms[roomId].players.filter(
      (player) => player !== socket.id
    );
    rooms[roomId].playerCount--;
    io.to(roomId).emit("user left", "User left the room!");
  });

  // Listen for level ups and emit to the other player
  socket.on("level up", (roomId) => {
    console.log(`Mini user ${socket.id}: level up`);
    // Broadcast the level up to the other player
    const otherPlayer = rooms[roomId].players.find(
      (player) => player !== socket.id
    );
    io.to(otherPlayer).emit("opponent leveled up", "Level up!");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// app.listen(PORT, (err) => {
//   if (err) console.log(err);
//   else console.log("HTTP server on http://localhost:%s", PORT);
// });
