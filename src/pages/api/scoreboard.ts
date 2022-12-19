import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const scoreboard = await prisma.scoreboard.findMany({
      orderBy: { score: "desc" },
    });
    res.json(scoreboard);
  } else if (req.method === "POST") {
    const { name, score } = JSON.parse(req.body);
    const scoreboard = await prisma.scoreboard.create({
      data: { name, score },
    });

    res.json(scoreboard);
  }
};
