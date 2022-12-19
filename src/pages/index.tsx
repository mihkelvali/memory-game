import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Memory game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}></div>
    </div>
  );
};

export default Home;
