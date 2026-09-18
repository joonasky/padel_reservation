import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PlayerList from "./PlayerList";
import Player from "../../types/Player";
import AddPlayer from "./AddPlayer";

const Players = ({ players }: { players: Player[] }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Paper sx={{ p: 2 }}>
          <PlayerList players={players} />
        </Paper>
      </Grid>
      <Grid size={12}>
        <Paper sx={{ p: 2 }}>
          <AddPlayer />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Players;
