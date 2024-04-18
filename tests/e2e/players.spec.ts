import { test, Page, expect } from "@playwright/test";
import { createPlayer } from "./factories/players";
import Player from "../../types/Player";

test("test players are displayed from DB", async ({ page, baseURL }) => {
  const player1 = await createPlayer();
  const player2 = await createPlayer();
  await checkBaseUrl({ page: page, baseURL: baseURL, contextPath: "/players" });

  await playerIsDisplayed(page, player1);
  await playerIsDisplayed(page, player2);
});

test("test adding the new player", async ({ page, baseURL }) => {
  await checkBaseUrl({ page: page, baseURL: baseURL, contextPath: "/players" });

  await page.locator("input").fill("John Snow");
  await page.locator("data-testid=addPlayerButton").click();
  await playerIsDisplayed(page, { id: "any", name: "John Snow" });
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
};

const playerIsDisplayed = async (page: Page, player: Player) => {
  expect(
    await page.locator("data-testid=" + player.name + "Name").textContent()
  ).toContain(player.name);
};
