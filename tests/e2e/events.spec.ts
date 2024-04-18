import { test, Page, expect } from "@playwright/test";
import { createEvent, deleteEvents } from "./factories/events";
import SportEvent from "../../types/Event";

test("test events are displayed from DB", async ({ page, baseURL }) => {
  const event1 = await createEvent();
  const event2 = await createEvent();
  await checkBaseUrl({ page: page, baseURL: baseURL, contextPath: "/" });

  await eventIsDisplayed(page, event1);
  await eventIsDisplayed(page, event2);
});

const checkBaseUrl = async ({
  page,
  baseURL,
  contextPath,
}: {
  page: Page;
  baseURL?: string;
  contextPath: string;
}) => {
  if (!baseURL) {
    throw Error("The base url not defined!");
  }

  // we have to first go to the base url, because only this works in the Vercel environment
  await page.goto(baseURL);
  await page.goto(baseURL + contextPath);
  expect(await page.getByTestId("dashboardTitle").textContent()).toContain(
    "All games"
  );
};

const eventIsDisplayed = async (page: Page, event: SportEvent) => {
  eventAttributeIsDisplayed(page, event.id + "Where", event.location);
  eventAttributeIsDisplayed(page, event.id + "Court", event.court.toString());
  eventAttributeIsDisplayed(
    page,
    event.id + "Starts",
    event.starts_at.toISOString()
  );
  eventAttributeIsDisplayed(
    page,
    event.id + "Ends",
    event.ends_at.toISOString()
  );
};

const eventAttributeIsDisplayed = async (
  page: Page,
  testid: string,
  label: string
) => {
  expect(await page.getByTestId(testid).textContent()).toContain(label);
};

test.afterAll(async () => {
  deleteEvents();
});
