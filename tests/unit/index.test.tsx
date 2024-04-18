import { render, screen } from "@testing-library/react";
import EventsContainer from "../../pages/index";
import "@testing-library/jest-dom";
import { checkDashboard } from "./utils/dashboard";
import { createEvent } from "./factories/events";
import SportEvent from "../../types/Event";

jest.mock("next/router", () => require("next-router-mock"));

describe("Test the first page", () => {
  it("has Dashboard", () => {
    render(<EventsContainer pastEvents={[]} futureEvents={[]} />);
    checkDashboard({ dashboardTitle: "All games" });
  });

  it("renders tables", () => {
    const event1 = createEvent();
    const event2 = createEvent();
    const event3 = createEvent();
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    event3.starts_at = nextYear;

    render(
      <EventsContainer pastEvents={[event1, event2]} futureEvents={[event3]} />
    );

    tableHasCorrectColumns("Past");
    tableHasCorrectColumns("Future");
    tableHasEvent(event1);
    tableHasEvent(event2);
    tableHasEvent(event3);
  });
});

const tableHasCorrectColumns = (pastOrFuture: string) => {
  tableHas(pastOrFuture + "EventWhere", "Where");
  tableHas(pastOrFuture + "EventCourt", "Court");
  tableHas(pastOrFuture + "EventStarts", "Starts");
  tableHas(pastOrFuture + "EventEnds", "Ends");
  tableHas(pastOrFuture + "EventPlayers", "Participants");
};

const tableHasEvent = (event: SportEvent) => {
  tableHas(event.id + "Where", event.location);
  tableHas(event.id + "Court", event.court.toString());
  tableHas(event.id + "Starts", event.starts_at.toISOString());
  tableHas(event.id + "Ends", event.ends_at.toISOString());
  tableHas(event.id + "Participants", "0");
};

const tableHas = (id: string, title: string) => {
  expect(screen.getByTestId(id).textContent).toContain(title);
};
