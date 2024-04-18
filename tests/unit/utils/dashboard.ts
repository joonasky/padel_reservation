import { screen } from "@testing-library/react";

export const checkDashboard = ({
  dashboardTitle,
}: {
  dashboardTitle: string;
}) => {
  expect(screen.getByTestId("dashboardTitle").textContent).toContain(
    dashboardTitle
  );
  expect(screen.getByTestId("menuPadelGames").textContent).toContain("Events");
  expect(screen.getByTestId("menuPlayers").textContent).toContain("Players");
};
