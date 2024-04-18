import { GetServerSideProps } from "next";
import prisma from "../../../prisma";
import Dashboard from "../../../components/dashboard/Dashboard";
import ViewEvent from "../../../components/games/ViewEvent";
import SportEvent from "../../../types/Event";
import Player from "../../../types/Player";

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const eventId = params.slug;
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  const players = await prisma.player.findMany({
    include: {
      events: true,
    },
    where: {
      events: { some: { eventId: eventId } },
    },
  });

  return {
    props: {
      event,
      players,
    },
  };
};

const ViewEventContainer = ({
  event,
  players,
}: {
  event: SportEvent;
  players: Player[];
}) => {
  return (
    <Dashboard title="Event">
      <ViewEvent event={event} players={players} />
    </Dashboard>
  );
};

export default ViewEventContainer;
