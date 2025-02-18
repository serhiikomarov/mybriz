import { test, expect } from "@playwright/test";
import { createBUser } from "../bUserCreate/bUserCreateUtils";
import { addMoney } from "./addMoneyUtils";

test.describe("Checking add money function", () => {
  let userID: number;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userID = createdUser;
  });

  test("Checking add money function", async ({ browser }) => {
    const context = await browser.newContext();
    const responseBody = await addMoney(context.request, userID, { amount: 100 });
    expect(responseBody).toHaveProperty("data", true);
    console.log(`${userID}: money credited to the balance`);
  });
});
