import Player from "./Player";
import SportEvent from "./Event";

type Participation = {
  player: Player;
  playerId: String;
  event: SportEvent;
  eventId: string;
  registeredAt: Date;
};

export default Participation;
