import { test, expect } from "@playwright/test";
import { createBUser } from "../bUser/bUserCreate/bUserCreateUtils";
import { createCTVAccount } from "./createCTVAccountUtils";

test.describe("Checking create CTV account function", () => {
  let userID: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userID = String(createdUser);
  });

  test("Checking create CTV account function", async ({ browser }) => {
    const context = await browser.newContext();
    const responseBody = await createCTVAccount(context.request, userID);
    expect(responseBody.data.UserID).toEqual(userID);
  });
});
