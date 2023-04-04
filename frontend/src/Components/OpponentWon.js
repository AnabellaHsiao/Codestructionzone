function OpponentWon() {
  return (
    <div className="container">
      <h1>Your opponent won {":("}</h1>
      <img src="/assets/youlost.gif" style={{ height: "40%" }}></img>
      <button
        className="big-btn play-again"
        onClick={() => window.location.reload()}
      >
        Play Again
      </button>
    </div>
  );
}

export default OpponentWon;
