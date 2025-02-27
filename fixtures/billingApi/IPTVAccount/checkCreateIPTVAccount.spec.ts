import { test } from "@playwright/test";
import { createBUser } from "../bUser/bUserCreate/bUserCreateUtils";
import { createIPTVAccount, getIPTVAccountID } from "./createIPTVAccountUtils";

// Don't run both test at each time, use only one...
// ..."Checking create IPTV account function" or "Checking get IPTV account function"
test.describe("Checking create IPTV account function", () => {
  let userID: number;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    userID = await createBUser(context.request);
  });

  test("Checking create IPTV account function", async ({ browser }) => {
    const context = await browser.newContext();
    const responseBody = await createIPTVAccount(context.request, userID);
    console.log(responseBody);
  });

  test("Checking get IPTV account function", async ({ browser }) => {
    const context = await browser.newContext();
    const accountID = await getIPTVAccountID(context.request, userID);
    console.log(accountID);
  });
});
