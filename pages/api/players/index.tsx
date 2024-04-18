import { NextApiRequest, NextApiResponse } from "next";
import PlayerSave from "../../../types/PlayerSave";
import prisma from "../../../prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const playerSave: PlayerSave = req.body;

  await prisma.player.create({
    data: {
      name: playerSave.name,
    },
  });

  res.status(201).json({});
}
