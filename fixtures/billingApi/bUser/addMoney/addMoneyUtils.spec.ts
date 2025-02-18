import { test, expect } from "@playwright/test";
import { createBUser } from "../bUserCreate/bUserCreateUtils";
import { addMoney } from "./addMoneyUtils";

test.describe("Checking update user password function", () => {
  let userID: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userID = String(createdUser);
  });

  test("Checking update user password function", async ({ browser }) => {
    const context = await browser.newContext();
    const response = await addMoney(context.request, userID, { amount: 100 });
    console.log(userID);
  });
});
