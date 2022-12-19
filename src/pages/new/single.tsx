import { NextPage } from "next";
import Head from "next/head";
import { useImmer } from "use-immer";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import styles from "../../styles/NewSingle.module.css";

enum CardSide {
  FACE_UP, FACE_DOWN
}

const NewGame: NextPage = () => {
  const [game, setGame] = useImmer({
    0: { image: '001', isFaceUp: false, isVisible: true, matchingId: 1 },
    1: { image: '001', isFaceUp: false, isVisible: true, matchingId: 0 },
    2: { image: '004', isFaceUp: false, isVisible: true, matchingId: 3 },
    3: { image: '004', isFaceUp: false, isVisible: true, matchingId: 2 },
    4: { image: '007', isFaceUp: false, isVisible: true, matchingId: 5 },
    5: { image: '007', isFaceUp: false, isVisible: true, matchingId: 4 },
  });
  const [turnedCards, setTurnedCards] = useImmer([]);
  const [madeMoves, setMadeMoves] = useImmer(0);
  let timer: NodeJS.Timeout;

  const onClick = (id: Number): void => {
    turnCard(id, CardSide.FACE_UP);
    setTurnedCards((prev): any => {
      if (!turnedCards.includes(id)) {
        prev.push(id);
      }
    });
  }

  const checkGameStatus = (): void => {
    console.log(turnedCards)
    if (turnedCards.length < 2) {
      console.log('turn another card over ', turnedCards);
      return;
    }
    setMadeMoves((prev) => ++prev);
    setTimeout(() => {
      setTurnedCards([]);
      if (isMatchOnTable()) {
        console.log('found a match!', turnedCards);
        hideCards(turnedCards);
        return;
      }
      console.log('unlucky, try again!');
      turnCardsFaceUp();
    }, 1000);
    return;
  };

  const turnCardsFaceUp = (): void => {
    for (const cardId of turnedCards) {
      turnCard(cardId, CardSide.FACE_DOWN);
    }
  };

  const isMatchOnTable = (): boolean => {
    for (const cardId of turnedCards) {
      if (turnedCards.includes(game[String(cardId)].matchingId)) {
        return true;
      }
    }
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
  }, [turnedCards]);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Single-player game | Memory game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <span>Moves made: {madeMoves}</span>
      <div className={styles.main}>
        {Object.entries(game).map(([id, card]) => (
          <Card
            key={id}
            id={Number(id)}
            imageName={`${card.image}.png`}
            isVisible={card.isVisible}
            isFaceUp={card.isFaceUp}
            onClick={onClick}
          />)
        )}
      </div>
    </div>
  );
};

export default NewGame