import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { checkDashboard } from "../utils/dashboard";
import EditEventContainer from "../../../pages/events/[slug]/edit";
import { createEvent, createEventSave } from "../factories/events";

jest.mock("next/router", () => require("next-router-mock"));

describe("Test edit event container", () => {
  it("has dashboard", () => {
    const event = createEvent();
    render(<EditEventContainer event={event} />);
    checkDashboard({ dashboardTitle: "Edit Event" });
  });

  it("has a working create form", async () => {
    const event = createEvent();
    const expectedEvent = createEventSave();
    expectedEvent.id = event.id;
    expectedEvent.starts_at = event.starts_at.toISOString();
    expectedEvent.ends_at = event.ends_at.toISOString();
    render(<EditEventContainer event={event} />);

    hasFormField("addEventLocationInput", "Location");
    hasFormField("addEventCourtInput", "Court #");

    giveInput("addEventLocationInput", "Lappi");
    expectedEvent.location = "Lappi";
    giveInput("addEventCourtInput", "100");
    expectedEvent.court = 100;

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    await waitFor(() => {
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual("/api/events/");
      expect(fetchMock.mock.calls[0][1]?.headers).toEqual({
        "Content-Type": "application/json",
      });
      // @ts-ignore
      expect(JSON.parse(fetchMock.mock.calls[0][1]?.body)).toEqual(
        expectedEvent
      );
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
