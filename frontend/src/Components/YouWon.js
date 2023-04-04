function YouWon() {
  return (
    <div>
      <h1>You Won!</h1>
      <button onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
}

export default YouWon;
