import useSWR, { mutate } from "swr";
import { Scoreboard } from "./types";

const scoreboardPath = "/api/scoreboard";

export const useScoreboard = () => useSWR<Scoreboard[]>(scoreboardPath);
/*
export const createTodo = async (text: string) => {
  mutate(
    todoPath,
    todos => [{ text, completed: false, id: "new-todo" }, ...todos],
    false,
  );
  await fetch(todoPath, {
    method: "POST",
    body: JSON.stringify({ text }),
  });

  mutate(todoPath);
};
*/