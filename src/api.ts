import useSWR from "swr";
import { Scoreboard } from "./types";

const scoreboardPath = "/api/scoreboard";

export const useScoreboard = () => useSWR<Scoreboard[]>(scoreboardPath);

export const addScore = async (name: string, score: number) => {
  await fetch(scoreboardPath, {
    method: "POST",
    body: JSON.stringify({ name, score }),
  });
};
