function YouWon() {
  return (
    <div className="container">
      <h1>You Won!</h1>
      <img src="/assets/youwon.gif" style={{ height: "40%" }}></img>
      <button
        className="big-btn play-again"
        onClick={() => window.location.reload()}
      >
        Play Again
      </button>
    </div>
  );
}

export default YouWon;
