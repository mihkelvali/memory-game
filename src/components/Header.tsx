import Link from "next/link";
import { FC } from "react";
import styles from "../styles/Header.module.css";

const Header: FC = () => (
    <header className={styles.header}>
        <h1 className={styles.title}>
            <Link href="/">Pokèmon memory game</Link>
        </h1>
        <h2 className={styles.headerButtons}>
            <a href="/new">New game</a>
            <Link href="/scoreboard">Scoreboard</Link>
        </h2>
    </header>
)

export default Header;
