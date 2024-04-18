import { GetServerSideProps } from "next";
import prisma from "../../../prisma";
import Dashboard from "../../../components/dashboard/Dashboard";
import EditEvent from "../../../components/games/EditEvent";
import SportEvent from "../../../types/Event";

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const eventId = params.slug;
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  return {
    props: {
      event,
    },
  };
};

const EditEventContainer = ({ event }: { event: SportEvent }) => {
  return (
    <Dashboard title="Edit Event">
      <EditEvent event={event} />
    </Dashboard>
  );
};

export default EditEventContainer;
