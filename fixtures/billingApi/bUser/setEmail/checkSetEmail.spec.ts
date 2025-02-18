import { test, expect } from "@playwright/test";
import { createBUser } from "../bUserCreate/bUserCreateUtils";
import { addEmail } from "./setEmailUtils";
import { generateRandomEmail } from "../../../helpers";

test.describe("Checking addEmail function", () => {
  let userID: number;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userID = createdUser;
  });

  test("Checking addEmail function", async ({ browser }) => {
    const context = await browser.newContext();
    const email = generateRandomEmail();
    const responseBody = await addEmail(context.request, userID, email);
    try {
      expect(responseBody).toHaveProperty("data", true);
      console.log(`${userID}: email added.`);
    } catch (error) {
      console.error("Error: email not added");
    }
  });
});
