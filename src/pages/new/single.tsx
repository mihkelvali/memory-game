import { NextPage } from "next";
import Head from "next/head";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import styles from "../../styles/SingleGame.module.css";
import { generateGame } from "../../utils/gameGenerator";

enum CardSide {
  FACE_UP, FACE_DOWN
}

const NewGame: NextPage = () => {
  const [game, setGame] = useImmer(generateGame());
  const [turnedCards, setTurnedCards] = useImmer([]);
  const [movesCount, setMovesCount] = useImmer(0);
  const [allowNextTurn, setAllowNextTurn] = useImmer(true);
  const [isGameWon, setIsGameWon] = useImmer(false);
  let timer: NodeJS.Timeout;

  const onCardClick = (id: Number): void => {
    if (!allowNextTurn) return;
    turnCard(id, CardSide.FACE_UP);
    setTurnedCards((prev): any => {
      if (!turnedCards.includes(id)) {
        prev.push(id);
      }
    });
  }

  const checkGameStatus = (): void => {
    if (turnedCards.length < 2) {
      console.log('turn another card over ', turnedCards);
      return;
    }
    setMovesCount((prev) => ++prev);
    setAllowNextTurn(false);
    timer = setTimeout(() => {
      setAllowNextTurn(true);
      if (didFindMatchingCards()) {
        console.log('found a match!', turnedCards);
        hideCards(turnedCards);
        setTurnedCards([]);
        return;
      }
      console.log('unlucky, try again!');
      setTurnedCards([]);
      turnCardsFaceUp();
    }, 1000);
    return;
  };

  const checkIfGameOver = (): boolean => {
    for (const cardId of Object.keys(game)) {
      if (game[cardId].isVisible) return false;
    }
    return true;
  };

  const turnCardsFaceUp = (): void => {
    for (const cardId of turnedCards) {
      turnCard(cardId, CardSide.FACE_DOWN);
    }
  };

  const didFindMatchingCards = (): boolean => {
    let turnedCardImages = [];
    for (const cardId of turnedCards) {
      turnedCardImages.push(game[cardId].image);
    }
    if (turnedCardImages[0] === turnedCardImages[1]) return true;
    return false;
  }

  const turnCard = (id: Number, cardSide: CardSide): void => {
    setGame((draftGame) => {
      draftGame[String(id)].isFaceUp = cardSide === CardSide.FACE_UP;
    });
    if (cardSide === CardSide.FACE_DOWN) {
      setTurnedCards((prev) => prev.filter(cardId => cardId !== id));
    }
  };

  const hideCards = (cardIds: number[]): void => {
    for (const cardId of cardIds) {
      setGame((draftGame) => {
        draftGame[String(cardId)].isVisible = false;
      });
    }
  }

  useEffect(() => {
    checkGameStatus();
    if (checkIfGameOver()) {
      timer = setTimeout(() => {
        setIsGameWon(true);
      }, 1000);
    }
  }, [turnedCards]);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    console.log('isGameWon?', isGameWon)
  }, [isGameWon])

  return (
    <div className={styles.container}>
      <Head>
        <title>Single-player game | Memory game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!isGameWon && <span>Moves made: {movesCount}</span>}
      <div className={styles.main}>
        {isGameWon
          ? (
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              <span>Game won in {movesCount} moves!</span>
              <a onClick={() => {
                setGame(generateGame());
                setIsGameWon(false);
                setMovesCount(0);
              }} style={{ cursor: 'pointer' }}>Play again!</a>
            </div>
          )
          : Object.entries(game).map(([id, card]) => (
            <Card
              key={id}
              id={Number(id)}
              imageName={`${card.image}.png`}
              isVisible={card.isVisible}
              isFaceUp={card.isFaceUp}
              onClick={onCardClick}
            />)
          )}
      </div>
    </div>
  );
};

export default NewGame