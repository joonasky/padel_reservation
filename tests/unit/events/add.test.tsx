import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { checkDashboard } from "../utils/dashboard";
import AddEventContainer from "../../../pages/events/add";
import { createEventSave } from "../factories/events";

jest.mock("next/router", () => require("next-router-mock"));

describe("Test add event container", () => {
  it("has dashboard", () => {
    render(<AddEventContainer />);
    checkDashboard({ dashboardTitle: "Add an event" });
  });

  it("has a working create form", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
    const expectedEvent = createEventSave();
    render(<AddEventContainer />);

    hasFormField("addEventLocationInput", "Location");
    hasFormField("addEventCourtInput", "Court #");

    giveInput("addEventLocationInput", expectedEvent.location.toString());
    giveInput("addEventCourtInput", expectedEvent.court.toString());

    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual("/api/events");
      expect(fetchMock.mock.calls[0][1]).toEqual({
        body: JSON.stringify(expectedEvent),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
    });
  });
});

function hasFormField(id: string, title: string) {
  expect(screen.getByTestId(id).textContent).toContain(title);
}

function giveInput(id: string, value: string) {
  const textInput = screen.getByTestId(id).querySelector("input");
  if (textInput != null) {
    fireEvent.change(textInput, {
      target: { value: value },
    });
  }
}
