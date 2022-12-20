import { NextPage } from "next";
import Head from "next/head";
import { useImmer } from "use-immer";

import Header from "../../components/Header";
import styles from "../../styles/Solo.module.css";
import GameWon from "../../components/GameWon";
import Game from "../../components/Game";


const NewGame: NextPage = () => {
  const [isGameWon, setIsGameWon] = useImmer(false);
  const [movesCount, setMovesCount] = useImmer(0);

  return (
    <div className={styles.container}>
      <Head>
        <title>Single-player game | Memory game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!isGameWon && <span>Moves made: {movesCount}</span>}
      <div>
        {isGameWon
          ? <GameWon movesCount={movesCount} />
          : <Game setMovesCount={setMovesCount} setIsGameWon={setIsGameWon} />
        }
      </div>
    </div>
  );
};

export default NewGame