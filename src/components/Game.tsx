import { FC, useEffect } from "react";
import styles from "../styles/Game.module.css";
import { useImmer } from "use-immer";
import { generateGame } from "../utils/gameGenerator";
import Card from "./Card";

type Props = {
  setMovesCount: any,
  setIsGameWon: (b: boolean) => void,
}

enum CardSide {
  FACE_UP, FACE_DOWN
}

const Game: FC<Props> = ({ setMovesCount, setIsGameWon }) => {
  const [game, setGame] = useImmer(generateGame());
  const [turnedCards, setTurnedCards] = useImmer([]);
  const [allowNextTurn, setAllowNextTurn] = useImmer(true);

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
    setMovesCount((prev: number) => ++prev);
    setAllowNextTurn(false);
    timer = setTimeout(() => {
      setAllowNextTurn(true);
      if (areMatchingCardsTurned()) {
        console.log('found a match!');
        hideCards(turnedCards);
      } else {
        console.log('unlucky, try again!');
        turnAllCardsFaceDown();
      }
      setTurnedCards([]);
    }, 1000);
    return;
  };

  const checkIfGameOver = (): boolean => {
    for (const cardId of Object.keys(game)) {
      if (game[cardId].isVisible) return false;
    }
    return true;
  };

  const turnAllCardsFaceDown = (): void => {
    for (const cardId of turnedCards) {
      turnCard(cardId, CardSide.FACE_DOWN);
    }
  };

  const areMatchingCardsTurned = (): boolean => {
    let turnedCardImages = [];
    for (const cardId of turnedCards) {
      turnedCardImages.push(game[cardId].image);
    }
    return turnedCardImages[0] === turnedCardImages[1];
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

  /*const resetGame = () => {
    setGame(generateGame());
    setIsGameWon(false);
    setMovesCount(0);
  }*/

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

  return (
    <div className={styles.game}>
      {Object.entries(game).map(([id, card]) => (
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
  )
}

export default Game;
