import { FC, useState } from "react";
import { addScore } from "../api";
import styles from "../styles/GameWon.module.css";

type Props = {
  movesCount: number,
  resetGame: () => void,
}

const GameWon: FC<Props> = ({ movesCount, resetGame }) => {
  const [nameValue, setNameValue] = useState('');
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);

  const submitResult = async () => {
    if (!nameValue) return;
    addScore(nameValue, movesCount);
    setIsScoreSubmitted(true);
  }

  return (
    <div className={styles.container}>
      {!isScoreSubmitted ? (
        <>
          <span>Game won in {movesCount} moves!</span>
          <label htmlFor="nameInput" style={{ marginTop: 20 }}>Enter your name</label>
          <input
            id="nameInput"
            value={nameValue}
            onChange={(e) => { setNameValue(e.target.value) }}
            placeholder="Name"
          />
          <button onClick={() => { submitResult() }}>Submit to scoreboard</button>
        </>
      ) : (
        <>
          <span>Score submitted!</span>
          <a onClick={resetGame} className={styles.playAgain}>Play again!</a>
        </>
      )}
    </div>
  )
}

export default GameWon;
