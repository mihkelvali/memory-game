import { FC } from "react";
import Image from "next/image";
import cardStyles from "../styles/Card.module.css";

type Props = {
  id: number,
  imageName: string,
  isVisible: boolean,
  isFaceUp: boolean,
  onClick: (id: number) => void,
}

const Card: FC<Props> = ({ id, imageName, isVisible, isFaceUp, onClick }) => {
  return (
    <div className={cardStyles.cardContainer}>
      <div
        onClick={() => {
          if (!isVisible) return;
          onClick(id);
        }}
        className={`${cardStyles.card} ${!isVisible ? cardStyles.hidden : ''}`}
      >
        <div className={`${cardStyles.cardInner} ${isFaceUp ? cardStyles.turned : ''}`}>
          <div className={cardStyles.background}>
            <Image
              src="/assets/images/background.jpeg"
              alt="Card"
              layout="fill"
              priority
            />
          </div>
          <div className={cardStyles.foreground}>
            <Image
              src={`/assets/images/${imageName}`}
              alt="Card"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;