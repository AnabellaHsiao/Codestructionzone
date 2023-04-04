import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModeSelection from "./ModeSelection";
import SinglePlayerMode from "./SinglePlayerMode";
import VersusMode from "./VersusMode";
import { useAuth0 } from "@auth0/auth0-react";

function CodestructionZone() {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Router>
        <Routes>
          <Route path="/" element={<ModeSelection />}></Route>
          <Route path="/single-player" element={<SinglePlayerMode />}></Route>
          <Route path="/versus" element={<VersusMode />}></Route>
        </Routes>
      </Router>
    )
  );
}

export default CodestructionZone;
