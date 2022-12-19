import { FC } from "react";
import { useScoreboard } from "../api";
import styles from "../styles/Scoreboard.module.css";


const Scoreboard: FC = () => {
  const { data: scoreboard, error } = useScoreboard();

  if (error != null) return <div>Error loading scoreboard...</div>;
  if (scoreboard == null) return <div>Loading...</div>;

  if (scoreboard.length === 0) {
    return <div>Scoreboard is empty, try playing a game!</div>;
  }

  return (
    <div className={styles.main}>
      <table className={styles.table}>
        <tr>
          <th className={styles.name}>Name</th>
          <th>Score</th>
        </tr>
        {scoreboard.map((row) => (
          <tr key={row.id}>
            <td className={styles.name}>{row.name}</td>
            <td>{row.score}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Scoreboard;

