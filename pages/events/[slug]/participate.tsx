import { GetServerSideProps } from "next";
import prisma from "../../../prisma";
import Dashboard from "../../../components/dashboard/Dashboard";
import Participate from "../../../components/games/Participate";
import SportEvent from "../../../types/Event";
import Player from "../../../types/Player";

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const players = await prisma.player.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  const eventId = params.slug;
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  return {
    props: { event, players },
  };
};

const ParticipateContainer = ({
  event,
  players,
}: {
  event: SportEvent;
  players: Player[];
}) => {
  return (
    <Dashboard title="Participate">
      <Participate event={event} players={players} />
    </Dashboard>
  );
};

export default ParticipateContainer;
