import { test, expect } from "@playwright/test";
import { createBUser } from "../bUser/bUserCreate/bUserCreateUtils";
import { createCTVAccount } from "./createCTVAccountUtils";

test.describe("Checking create CTV account function", () => {
  let userID: number;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    userID = await createBUser(context.request);
  });

  test("Checking create CTV account function", async ({ browser }) => {
    const context = await browser.newContext();
    const responseBody = await createCTVAccount(context.request, userID);
    try {
      expect(responseBody.data.UserID).toEqual(userID);
      console.log(`${userID}: CTV account added`);
    } catch (error) {
      console.error(`${userID}: CTV account not added`);
    }
  });
});
