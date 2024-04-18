import * as React from "react";
import { Grid, Paper, Button, Alert } from "@mui/material";
import Router from "next/router";
import SportEvent from "../../types/Event";
import Player from "../../types/Player";
import PlayerSelect from "../players/PlayerSelect";
import ParticipationSave from "../../types/ParticipationSave";

const Participate = ({
  event,
  players,
}: {
  event: SportEvent;
  players: Player[];
}) => {
  const [chosenPlayer, setChosenPlayer] = React.useState<string>();
  const [error, setError] = React.useState<boolean>(false);
  const onSubmit = async (playerId?: string) => {
    if (playerId) {
      try {
        const body: ParticipationSave = {
          playerId: playerId,
          eventId: event.id,
        };

        await fetch("/api/participations/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        await Router.push("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(true);
    }
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <PlayerSelect
            players={players}
            onChange={setChosenPlayer}
          ></PlayerSelect>
        </Paper>
        {error && <Alert severity="error">You did not pick a player.</Alert>}
      </Grid>

      <Grid item xs={6}>
        <Button
          variant="outlined"
          data-testid={"participateButton"}
          onClick={(e) => {
            e.preventDefault();
            onSubmit(chosenPlayer);
          }}
        >
          Partake!
        </Button>
      </Grid>
    </Grid>
  );
};

export default Participate;
