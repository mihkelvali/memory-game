import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const scoreboard = await prisma.scoreboard.findMany({
      orderBy: { score: "desc" },
    });
    res.json(scoreboard);
  }/* else if (req.method === "POST") {
    // create todo
    const text = JSON.parse(req.body).text;
    const todo = await prisma.todo.create({
      data: { text, completed: false },
    });

    res.json(todo);
  }*/
};
