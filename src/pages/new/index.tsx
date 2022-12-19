import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import styles from "../../styles/New.module.css";

const NewGame: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>New game | Memory game</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className={styles.main}>
                <Link href="/new/single">Create a new single-player game</Link>
                <Link href="">Create a new multiplayer game</Link>
            </div>
        </div>
    );
};

export default NewGame