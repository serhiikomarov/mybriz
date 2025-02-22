import { test, expect } from "@playwright/test";
import { createBUser } from "../bUser/bUserCreate/bUserCreateUtils";
import { createCTVAccount, getCTVAccountID } from "./createCTVAccountUtils";

test.describe("Checking create CTV account function", () => {
  let userID: number;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    userID = await createBUser(context.request);
  });

  test("Checking create CTV account function", async ({ browser }) => {
    const context = await browser.newContext();
    const accountID = await createCTVAccount(context.request, userID);
    console.log(accountID);
  });

  test("Checking get CTV account function", async ({ browser }) => {
    const context = await browser.newContext();
    const accountID = await getCTVAccountID(context.request, userID);
    console.log(accountID);
  });
});
