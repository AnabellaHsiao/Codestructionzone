function OpponentWon() {
  return (
    <div className="opponent-won">
      <h1>Your opponent won!</h1>
      <button onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
}

export default OpponentWon;
