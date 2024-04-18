import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddPlayerContainer from "../../pages/players";
import "@testing-library/jest-dom";
import { checkDashboard } from "./utils/dashboard";
import { createPlayer } from "./factories/players";

jest.mock("next/router", () => require("next-router-mock"));

describe("Test players container", () => {
  it("has Dashboard", () => {
    render(<AddPlayerContainer players={[]} />);
    checkDashboard({ dashboardTitle: "Players" });
  });

  it("has the players list", () => {
    const player1 = createPlayer();
    const player2 = createPlayer();
    const players = [player1, player2];
    render(<AddPlayerContainer players={players} />);

    expect(screen.getByTestId("playerListTitle").textContent).toContain(
      "Players"
    );
    expect(
      screen.getByTestId("playerListColumnTitleName").textContent
    ).toContain("Name");

    players.forEach((player) => checkPlayer({ playerName: player.name }));
  });

  it("check adding a new player", async () => {
    const player1 = createPlayer();
    const player2 = createPlayer();
    render(<AddPlayerContainer players={[player1, player2]} />);

    expect(screen.getByTestId("addPlayerTitle").textContent).toContain(
      "Add player"
    );
    expect(screen.getByTestId("playerNameTextField").textContent).toContain(
      "Name"
    );

    const playerNameInput = screen
      .getByTestId("playerNameTextField")
      .querySelector("input");
    if (playerNameInput != null) {
      fireEvent.change(playerNameInput, {
        target: { value: "John Blackthorn" },
      });
    }
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual("/api/players");
      expect(fetchMock.mock.calls[0][1]).toEqual({
        body: '{"name":"John Blackthorn"}',
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
    });
  });
});

const checkPlayer = ({ playerName }: { playerName: string }) => {
  expect(screen.getByTestId(playerName + "Name").textContent).toContain(
    playerName
  );
};
