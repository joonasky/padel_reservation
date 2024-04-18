import * as React from "react";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import Title from "../dashboard/Title";
import SportEvent from "../../types/Event";
import Router from "next/router";

const Events = ({
  events,
  futureOrPast,
}: {
  events: SportEvent[];
  futureOrPast: "Future" | "Past";
}) => {
  const getParts = (event: SportEvent) => {
    return event.participants?.length;
  };
  return (
    <React.Fragment>
      <Title titleTestId="rankingTitle">{futureOrPast} Events</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell data-testid={futureOrPast + "EventWhere"}>
              Where
            </TableCell>
            <TableCell data-testid={futureOrPast + "EventCourt"}>
              Court
            </TableCell>
            <TableCell data-testid={futureOrPast + "EventStarts"}>
              Starts at
            </TableCell>
            <TableCell data-testid={futureOrPast + "EventEnds"}>
              Ends at
            </TableCell>
            <TableCell data-testid={futureOrPast + "EventPlayers"}>
              Participants
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell data-testid={event.id + "Where"}>
                {event.location}
              </TableCell>
              <TableCell data-testid={event.id + "Court"}>
                {event.court}
              </TableCell>
              <TableCell data-testid={event.id + "Starts"}>
                {new Date(event.starts_at).toISOString()}
              </TableCell>
              <TableCell data-testid={event.id + "Ends"}>
                {new Date(event.ends_at).toISOString()}
              </TableCell>
              <TableCell data-testid={event.id + "Participants"}>
                {getParts(event)}
              </TableCell>
              {futureOrPast === "Future" && (
                <TableCell data-testid={event.id + "Controls"}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      Router.push(`/events/${event.id}/view`);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      Router.push(`/events/${event.id}/participate`);
                    }}
                  >
                    Participate
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

export default Events;
