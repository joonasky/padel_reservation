import * as React from "react";
import { TextField, Box, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventSave from "../../types/EventSave";
import SportEvent from "../../types/Event";
import Router from "next/router";
import dayjs from "dayjs";

const EditEvent = ({ event }: { event: SportEvent }) => {
  const [editedEvent, setEditedEvent] = React.useState<SportEvent>(event);

  const handleButtonClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body: EventSave = {
        id: editedEvent.id,
        location: editedEvent.location,
        court: editedEvent.court,
        starts_at: editedEvent.starts_at.toISOString(),
        ends_at: editedEvent.ends_at.toISOString(),
      };

      await fetch(`/api/events/`, {
        method: "PUT",
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
        value={editedEvent.location}
        onChange={(e) =>
          setEditedEvent({ ...editedEvent, ...{ location: e.target.value } })
        }
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Court #"
        type="number"
        data-testid="addEventCourtInput"
        value={editedEvent.court}
        onChange={(e) =>
          setEditedEvent({
            ...editedEvent,
            ...{ court: Number(e.target.value) },
          })
        }
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          onChange={(datetime) =>
            datetime &&
            setEditedEvent({
              ...editedEvent,
              ...{ starts_at: datetime.toDate() },
            })
          }
          value={dayjs(editedEvent.starts_at)}
        />
        <DateTimePicker
          label="Ends"
          onChange={(datetime) =>
            datetime &&
            setEditedEvent({
              ...editedEvent,
              ...{ ends_at: datetime.toDate() },
            })
          }
          value={dayjs(editedEvent.ends_at)}
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        onClick={handleButtonClick}
        data-testid="addGameResultButton"
      >
        Edit
      </Button>
    </Box>
  );
};

export default EditEvent;
