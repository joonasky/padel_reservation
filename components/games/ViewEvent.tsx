import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import SportEvent from "../../types/Event";
import Router from "next/router";
import PlayerList from "../players/PlayerList";
import Player from "../../types/Player";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ViewEvent({
  event,
  players,
}: {
  event: SportEvent;
  players: Player[];
}) {
  const onDelete = async () => {
    try {
      await fetch(`/api/events/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Padel Game
            </Typography>
            <Typography variant="h5" component="div">
              {event.location}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {event.starts_at.toISOString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                Router.push(`/events/${event.id}/edit`);
              }}
            >
              Edit
            </Button>
            <Button size="small" variant="outlined" onClick={onDelete}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275 }}>
          <PlayerList players={players} event={event}></PlayerList>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            Router.push(`/events/${event.id}/participate`);
          }}
        >
          Participate
        </Button>
      </Grid>
    </Grid>
  );
}
