import * as React from "react";
import { TextField, Box, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventSave from "../../types/EventSave";
import Router from "next/router";
import dayjs from "dayjs";

const AddEvent = () => {
  const [location, setLocation] = React.useState<string>("");
  const [court, setCourt] = React.useState<number>(0);
  const [startsAt, setStartsAt] = React.useState<dayjs.Dayjs>(dayjs());
  const [endsAt, setEndsAt] = React.useState<dayjs.Dayjs>(dayjs());

  const handleButtonClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body: EventSave = {
        location: location,
        court: court,
        starts_at: startsAt.toISOString(),
        ends_at: endsAt.toISOString(),
      };

      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Location"
        variant="outlined"
        data-testid="addEventLocationInput"
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Court #"
        variant="outlined"
        type="number"
        data-testid="addEventCourtInput"
        onChange={(e) => setCourt(Number(e.target.value))}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label={"Starts"}
          onChange={(datetime) => datetime && setStartsAt(datetime)}
          data-testid="addEventStartsAtInput"
          value={startsAt}
        />
        <DateTimePicker
          label="Ends"
          value={endsAt}
          data-testid="addEventEndsAtInput"
          onChange={(datetime) => datetime && setEndsAt(datetime)}
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        onClick={handleButtonClick}
        data-testid="addEventButton"
      >
        Add
      </Button>
    </Box>
  );
};

export default AddEvent;
