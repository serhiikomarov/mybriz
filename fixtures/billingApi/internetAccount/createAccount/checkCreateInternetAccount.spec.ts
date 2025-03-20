import { test } from "@playwright/test";
import { createBUser } from "../../bUser/bUserCreate/bUserCreateUtils";
import { createInternetAccount, getInternetAccountID } from "./createInternetAccountUtils";
import { defaultInternetAccountObj } from "./createInternetAccount.data";

test.describe("Checking create Internet account function", () => {
  let userID: number;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    userID = await createBUser(context.request);
  });

  test("Checking create Internet account function", async ({ browser }) => {
    const context = await browser.newContext();
    const responseBody = await createInternetAccount(context.request, userID);
    console.log(userID);
    console.log(responseBody);
  });

  test("Checking get Internet account function", async ({ browser }) => {
    const context = await browser.newContext();
    const accountID = await getInternetAccountID(context.request, userID);
    console.log(`UserID: ${userID}, InetrnetAccountID: ${accountID}`);
  });
});
