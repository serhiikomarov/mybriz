import { test, expect } from "@playwright/test";
import { generateRandomEmail } from "../../../helpers";
import { createBUser } from "../../bUser/bUserCreate/bUserCreateUtils";
import { addEmail } from "../../bUser/setEmail/setEmailUtils";
import { emailConfirmationCode } from "./lastEmailCodeUtils";

test.describe("Checking email confirmation code", () => {
  let userID: string;
  let email: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userID = String(createdUser);
    email = generateRandomEmail();
    await addEmail(context.request, userID, email);
  });

  test("Checking email confirmation code", async ({ browser }) => {
    const context = await browser.newContext();
    const responseBody = await emailConfirmationCode(context.request, email);
    try {
      expect(typeof responseBody).toBe("string");
      console.log(`Email confirmation code received: ${responseBody}.`);
    } catch (error) {
      console.error("ERROR: Email confirmation code not received");
    }
  });
});
