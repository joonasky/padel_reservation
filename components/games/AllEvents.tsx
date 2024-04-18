import { Grid, Paper, Button } from "@mui/material";
import Events from "./Events";
import SportEvent from "../../types/Event";
import Router from "next/router";

const AllEvents = ({
  pastEvents,
  futureEvents,
}: {
  pastEvents: SportEvent[];
  futureEvents: SportEvent[];
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Events events={pastEvents} futureOrPast={"Past"} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Events events={futureEvents} futureOrPast={"Future"} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="outlined"
          onClick={() => {
            Router.push("/events/add");
          }}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default AllEvents;
