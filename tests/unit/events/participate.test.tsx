import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { checkDashboard } from "../utils/dashboard";
import ParticipateContainer from "../../../pages/events/[slug]/participate";
import { createEvent } from "../factories/events";
import { createPlayer } from "../factories/players";
import { createParticipation } from "../factories/participations";

jest.mock("next/router", () => require("next-router-mock"));

describe("Test participate container", () => {
  it("has dashboard", () => {
    const event = createEvent();
    const player1 = createPlayer();
    const player2 = createPlayer();
    render(<ParticipateContainer event={event} players={[player1, player2]} />);
    checkDashboard({ dashboardTitle: "Participate" });
  });

  it("has a working create form", async () => {
    const event = createEvent();
    const player1 = createPlayer();
    const player2 = createPlayer();
    const players = [player1, player2];
    const participation = createParticipation(event, player1);
    render(<ParticipateContainer event={event} players={players} />);

    hasField("playerSelectTitle", "Select player");
  });
});

function hasField(id: string, title: string) {
  expect(screen.getByTestId(id).textContent).toContain(title);
}
