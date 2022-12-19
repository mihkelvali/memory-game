import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header: any = () => (
    <header className={styles.header}>
        <h1 className={styles.title}>
            <Link href="/">Pokèmon memory game</Link>
        </h1>
        <h2 className={styles.headerButtons}>
            <Link href="/new">New game</Link>
            <Link href="/scoreboard">Scoreboard</Link>
        </h2>
    </header>
)

export default Header;
