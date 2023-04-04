import { useState, useEffect } from "react";
import io from "socket.io-client";
import YouWon from "./YouWon";
import OpponentWon from "./OpponentWon";
import MainSite from "./MainSite";

const socket = io("http://localhost:8000"); // Backend

const WIN_LEVEL = 7;

function JoinRoomScreen() {
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [targetRoomId, setTargetRoomId] = useState("");
  const [gameRoomReady, setGameRoomReady] = useState(false);
  const [currLevel, setCurrLevel] = useState(1);
  const [opponentLevel, setOpponentLevel] = useState(1);
  const [errorMsg, setErrorMsg] = useState(null);

  function handleCreateRoom() {
    socket.emit("create room");
  }

  function handleJoinRoom(targetRoomId) {
    socket.emit("join room", targetRoomId);
  }

  function handleLevelUp() {
    setCurrLevel(currLevel + 1);
    socket.emit("level up", currLevel + 1);
  }

  function handleLeaveRoom() {
    socket.emit("leave room", currentRoomId);
    setCurrentRoomId(null);
  }

  useEffect(() => {
    socket.on("room created", (roomId) => {
      setCurrentRoomId(roomId);
    });

    socket.on("room joined", (roomId) => {
      setCurrentRoomId(roomId);
    });

    socket.on("game room ready", () => {
      setGameRoomReady(true);
    });

    socket.on("game room no longer ready", () => {
      setGameRoomReady(false);
    });

    socket.on("room full", (message) => {
      setErrorMsg(message);
    });

    socket.on("room does not exist", (message) => {
      setErrorMsg(message);
    });

    socket.on("opponent leveled up", (message, newLevel) => {
      setOpponentLevel(newLevel);
    });

    socket.on("opponent left", (message) => {
      setErrorMsg(message);
    });

    return () => {
      socket.emit("leave room", currentRoomId);
    };
  }, []);

  return (
    <div>
      {currLevel >= WIN_LEVEL && <YouWon />}
      {opponentLevel >= WIN_LEVEL && <OpponentWon />}
      {currLevel < WIN_LEVEL && opponentLevel < WIN_LEVEL && (
        <div>
          {gameRoomReady && (
            <MainSite
              mode="1"
              handleLevelUp={handleLevelUp}
              opponentLevel={opponentLevel}
              handleLeaveRoom={handleLeaveRoom}
            />
          )}
          {!gameRoomReady && (
            <div>
              {!currentRoomId && (
                <div>
                  <button onClick={handleCreateRoom}>Create new room</button>
                  <input
                    type="text"
                    placeholder="Enter room ID"
                    onChange={(e) => setTargetRoomId(e.target.value)}
                  />
                  <button onClick={() => handleJoinRoom(targetRoomId)}>
                    Join room
                  </button>
                </div>
              )}
              {currentRoomId && <div>Current room: {currentRoomId}</div>}
              {/* <div>Game room ready: {gameRoomReady ? "Yes" : "No"}</div> */}
              {/* <div>Current level: {currLevel}</div>
          <button onClick={handleLevelUp}>Level myself up</button>
          <div>Opponent level: {opponentLevel}</div> */}
              {errorMsg && <div>Error message: {errorMsg}</div>}
              {currentRoomId && (
                <button onClick={handleLeaveRoom}>Leave room</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default JoinRoomScreen;
