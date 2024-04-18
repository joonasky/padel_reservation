import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import Title from "../dashboard/Title";
import Player from "../../types/Player";
import SportEvent from "../../types/Event";
import ParticipationSave from "../../types/ParticipationSave";
import Router from "next/router";

const PlayerList = ({
  players,
  event,
}: {
  players: Player[];
  event?: SportEvent;
}) => {
  const unParticipate = async (player: Player, event: SportEvent) => {
    try {
      const body: ParticipationSave = {
        playerId: player.id,
        eventId: event.id,
      };

      await fetch("/api/participations/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
      <Title titleTestId="playerListTitle">Players</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell data-testid="playerListColumnTitleName">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell data-testid={player.name + "Name"}>
                {player.name}
              </TableCell>
              {event && (
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => unParticipate(player, event)}
                  >
                    Pitäkää sittenkin tunkkinne
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default PlayerList;
