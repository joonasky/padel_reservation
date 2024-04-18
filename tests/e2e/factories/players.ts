import prisma from "../../../prisma";
import Player from "../../../types/Player";

const createId = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

export const createPlayer = async (): Promise<Player> => {
  const player = await prisma.player.create({
    data: {
      name: createId(),
    },
  });
  return player;
};
