import { useState } from "react";
import { NextPage, NextComponentType } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import styles from "../../styles/NewSingle.module.css";
import cardStyles from "../../styles/Card.module.css";
import Image from "next/image";

const Card: any = () => {
  const [isTurned, setIsTurned] = useState(false);
  const [imageName, setImageName] = useState('001.png');

  return (
    <div
      onClick={() => {
        setIsTurned((prevState) => !prevState)
      }}
      className={cardStyles.card}
    >
      <div className={`${cardStyles.cardInner} ${isTurned ? cardStyles.turned : ''}`}>
        <div className={cardStyles.background}></div>
        <div className={cardStyles.foreground}>
          <Image
            src={`/assets/images/${imageName}`}
            alt="Card"
            layout="fill"
            objectFit="contain"
          ></Image>
        </div>
      </div>
    </div>
  )
}

const NewGame: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>New game | Memory game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}>
        <Card />
      </div>
    </div>
  );
};

export default NewGame