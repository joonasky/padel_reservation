import Participation from "./Participation";

type SportEvent = {
  id: string;
  location: string;
  court: number;
  starts_at: Date;
  ends_at: Date;
  participants?: Participation[];
  createdAt: Date;
};

export default SportEvent;
