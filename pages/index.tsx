import { GetServerSideProps } from "next";
import prisma from "../prisma";
import Dashboard from "../components/dashboard/Dashboard";
import SportEvent from "../types/Event";
import AllEvents from "../components/games/AllEvents";

export const getServerSideProps: GetServerSideProps = async () => {
  const pastEvents = await prisma.event.findMany({
    where: {
      starts_at: {
        lte: new Date(),
      },
    },
    include: {
      participants: true,
    },
    orderBy: [
      {
        starts_at: "desc",
      },
    ],
    take: 10,
  });

  const futureEvents = await prisma.event.findMany({
    where: {
      starts_at: {
        gte: new Date(),
      },
    },
    include: {
      participants: true,
    },
    orderBy: [
      {
        starts_at: "asc",
      },
    ],
  });

  return {
    props: { pastEvents, futureEvents },
  };
};

const EventsContainer = ({
  pastEvents,
  futureEvents,
}: {
  pastEvents: SportEvent[];
  futureEvents: SportEvent[];
}) => {
  return (
    <Dashboard title="All games">
      <AllEvents pastEvents={pastEvents} futureEvents={futureEvents} />
    </Dashboard>
  );
};

export default EventsContainer;
