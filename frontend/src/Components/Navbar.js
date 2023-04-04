import React from "react";
import Select from "react-select";
import "./Navbar.css";
import TitleInteractive from "./TitleInteractive";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
  modeText,
  opponentLevel,
  handleLeaveRoom,
  mode,
}) => {
  //const languages = [{ value: "javascript", label: "javascript" }];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  const { logout } = useAuth0();
  const navigate = useNavigate();

  function handleLeave() {
    navigate("/");
    handleLeaveRoom();
  }

  return (
    <div className="navbar">
      <TitleInteractive width="400px" height="150px" />
      <div>
        <h5>{modeText}</h5>
        <Link to="/">
          <button className="change-mode">Change mode</button>
        </Link>
      </div>
      <div>
        <div style={{ padding: "10px 0" }}>
          <Select
            options={themes}
            value={userTheme}
            onChange={(e) => setUserTheme(e.value)}
            placeholder={userTheme}
          />
        </div>
        <label>Font Size </label>
        <input
          type="range"
          min="18"
          max="30"
          value={fontSize}
          step="2"
          onChange={(e) => {
            setFontSize(e.target.value);
          }}
        />
      </div>
      {mode === "1" && (
        <div className="versus-box">
          <div className="versus-box-left">
            <div className="opponent-info">Your opponent is on exercise:</div>
            <button className="leave-game" onClick={handleLeave}>
              Leave game
            </button>
          </div>
          <div className="opponent-level">{opponentLevel}</div>
        </div>
      )}
      <button className="log-out" onClick={() => logout()}>
        Log Out
      </button>
    </div>
  );
};

export default Navbar;