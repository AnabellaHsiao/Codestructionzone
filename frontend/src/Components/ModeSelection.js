import { Link } from "react-router-dom";
import TitleInteractive from "./TitleInteractive";
import { useAuth0 } from "@auth0/auth0-react";

function ModeSelection() {
  const { logout } = useAuth0();

  return (
    <div className="container">
      <button className="log-out top-right-corner" onClick={() => logout()}>
        Log out
      </button>
      <TitleInteractive width="700px" height="200px" />
      <h2>Choose a game mode:</h2>
      <div className="options">
        <Link to="/single-player" className="no-underline">
          <button className="big-btn">Single Player</button>
        </Link>
        <Link to="/versus" className="no-underline">
          <button className="big-btn">Versus</button>
        </Link>
      </div>
    </div>
  );
}

export default ModeSelection;
