import express from "express";
import { sequelize } from "./database.js";
import bodyParser from "body-parser";
import { compilerRouter } from "./routers/compiler_router.js";
import { usersRouter } from "./routers/users_router.js";
import { constructionHatBotRouter } from "./routers/construction_hat_bot.js";
import http from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

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

const pubClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
const subClient = pubClient.duplicate();

const rooms = {};

function generateRoomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const isRoomFull = (roomId) => {
  return rooms[roomId] && rooms[roomId].playerCount === 2;
};

io.on("connection", (socket) => {
  console.log(`A mini user has connected! ${socket.id}`);

  // Create a room
  socket.on("create room", () => {
    const roomId = generateRoomId();
    while (rooms[roomId]) {
      roomId = generateRoomId();
    }
    console.log(`Mini user ${socket.id} is creating room:` + roomId);
    socket.join(roomId);
    rooms[roomId] = {
      playerCount: 1,
      players: [socket.id],
    };
    socket.emit("room created", roomId);
  });

  // Join a room
  socket.on("join room", (roomId) => {
    if (!isRoomFull(roomId)) {
      console.log(`Mini user ${socket.id} is joining room:` + roomId);
      socket.join(roomId);
      if (!rooms[roomId]) {
        socket.emit("room does not exist", "Room does not exist!");
      } else {
        rooms[roomId].playerCount++;
        rooms[roomId].players.push(socket.id);
        // if there are two players, broadcast to both players that the game is ready to start
        socket.emit("room joined", roomId);
        if (rooms[roomId].playerCount === 2) {
          io.to(roomId).emit("game room ready");
        }
      }
    } else {
      console.log("Room is full! Mini user " + socket.id + " cannot join.");
      socket.emit("room full", "Room is full!");
    }
  });

  socket.on("disconnect", () => {
    console.log(`Mini user ${socket.id} has disconnected!`);

    let roomId = null;

    // Find if the user was in any room
    for (const room in rooms) {
      if (rooms[room].players.includes(socket.id)) {
        roomId = room;
        break;
      }
    }

    // If the user was in a room, remove the user from the room
    if (roomId) {
      socket.leave(roomId);
      // Remove the user from the room, decrement the player count
      if (rooms[roomId]) {
        rooms[roomId].players = rooms[roomId].players.filter(
          (player) => player !== socket.id
        );
        rooms[roomId].playerCount--;

        if (rooms[roomId].playerCount === 0) {
          delete rooms[roomId];
          console.log(
            `Room ${roomId} has been removed from rooms. In essence it has been destroyed haha.`
          );
        } else {
          io.to(roomId).emit("opponent left", "Opponent left the room!");
          io.to(roomId).emit("game room no longer ready");
        }
      }
    }
  });

  // Leave room
  socket.on("leave room", (roomId) => {
    // If roomId empty, find the room that the user is in
    if (!roomId) {
      for (const room in rooms) {
        if (rooms[room].players.includes(socket.id)) {
          roomId = room;
          break;
        }
      }
    }

    console.log(`Mini user ${socket.id} is leaving:` + roomId);
    socket.leave(roomId);
    // Remove the user from the room, decrement the player count
    if (rooms[roomId]) {
      rooms[roomId].players = rooms[roomId].players.filter(
        (player) => player !== socket.id
      );
      rooms[roomId].playerCount--;

      if (rooms[roomId].playerCount === 0) {
        delete rooms[roomId];
        console.log(
          `Room ${roomId} has been removed from rooms. In essence it has been destroyed haha.`
        );
      } else {
        io.to(roomId).emit("opponent left", "Opponent left the room!");
        io.to(roomId).emit("game room no longer ready");
      }
    }
  });

  // Listen for level ups and emit to the other player
  socket.on("level up", (newLevel) => {
    console.log(`Mini user ${socket.id} level up`);

    // Get the room that the user is in using rooms object
    const roomId = Object.keys(rooms).find(
      (key) => rooms[key].players.indexOf(socket.id) !== -1
    );

    if (roomId && rooms[roomId].players) {
      const otherPlayer = rooms[roomId].players.find(
        (player) => player !== socket.id
      );
      io.to(otherPlayer).emit("opponent leveled up", "Level up!", newLevel);
    }
  });
});

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  console.log("Redis connected");
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

// app.listen(PORT, (err) => {
//   if (err) console.log(err);
//   else console.log("HTTP server on http://localhost:%s", PORT);
// });
