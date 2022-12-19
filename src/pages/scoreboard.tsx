import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Scores from "../components/Scoreboard"

const Scoreboard: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Memory game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Scores />
    </div>
  );
};

export default Scoreboard;
