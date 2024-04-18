import prisma from "../../../prisma";
import SportEvent from "../../../types/Event";

const createId = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

const createCourt = () => {
  return Math.floor(Math.random() * 10);
};

export const createEvent = async (): Promise<SportEvent> => {
  return prisma.event.create({
    data: {
      location: createId(),
      court: createCourt(),
      starts_at: new Date("1995-12-17T03:24:00"),
      ends_at: new Date("1995-12-17T07:24:00"),
    },
  });
};

export const deleteEvents = async () => {
  return prisma.event.deleteMany({
    where: {
      createdAt: {
        gt: new Date(),
      },
    },
  });
};
