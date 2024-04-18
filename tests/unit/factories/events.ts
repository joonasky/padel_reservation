import SportEvent from "../../../types/Event";
import EventSave from "../../../types/EventSave";

const createId = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

const createCourt = () => {
  return Math.floor(Math.random() * 10);
};

export const createEvent = (): SportEvent => {
  return {
    id: createId(),
    location: createId(),
    court: createCourt(),
    starts_at: new Date("1995-12-17T03:24:00"),
    ends_at: new Date("1995-12-17T07:24:00"),
    createdAt: new Date(),
    participants: [],
  };
};

export const createEventSave = (): EventSave => {
  return {
    location: createId(),
    court: createCourt(),
    starts_at: new Date("2020-01-01").toISOString(),
    ends_at: new Date("2020-01-01").toISOString(),
  };
};
