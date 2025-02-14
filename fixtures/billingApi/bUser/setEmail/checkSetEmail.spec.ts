import { test, expect } from "@playwright/test";
import { createBUser } from "../bUserCreate/bUserCreateUtils";
import { globalData } from "../../../global.data";
import { addEmail } from "./setEmailUtils";
import { generateRandomEmail } from "../../../helpers";

test.describe("Checking addEmail function", () => {
  let userID: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userID = String(createdUser);
  });

  test("Checking addEmail function", async ({ browser }) => {
    const context = await browser.newContext();
    const email = generateRandomEmail();
    const responseBody = await addEmail(context.request, userID, email);
    console.log(responseBody);
  });
});
