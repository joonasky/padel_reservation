import { NextApiRequest, NextApiResponse } from "next";
import ParticipationSave from "../../../types/ParticipationSave";
import prisma from "../../../prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const participation: ParticipationSave = req.body;
  if (req.method === "DELETE") {
    await deleteParticipation(participation);
    res.status(204).json({});
  } else {
    await addParticipation(participation);
    res.status(201).json({});
  }
}

async function addParticipation(participation: ParticipationSave) {
  await prisma.participation.create({
    data: {
      ...participation,
    },
  });
}

async function deleteParticipation(participation: ParticipationSave) {
  await prisma.participation.delete({
    where: {
      playerId_eventId: {
        playerId: participation.playerId,
        eventId: participation.eventId,
      },
    },
  });
}
