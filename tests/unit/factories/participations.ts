import SportEvent from "../../../types/Event";
import Participation from "../../../types/Participation";
import Player from "../../../types/Player";

export const createParticipation = (
  event: SportEvent,
  player: Player
): Participation => {
  return {
    event: event,
    eventId: event.id,
    player: player,
    playerId: player.id,
    registeredAt: new Date(),
  };
};
