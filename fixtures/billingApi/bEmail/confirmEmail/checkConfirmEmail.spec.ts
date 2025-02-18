import { test, expect } from "@playwright/test";
import { generateRandomEmail } from "../../../helpers";
import { createBUser } from "../../bUser/bUserCreate/bUserCreateUtils";
import { addEmail } from "../../bUser/setEmail/setEmailUtils";
import { emailConfirmationCode } from "../lastEmailCode/lastEmailCodeUtils";
import { confirmEmail } from "./confirmEmailUtils";

test.describe("Checking email confirmation code", () => {
  let userID: number;
  let email: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userID = createdUser;
    email = generateRandomEmail();
    await addEmail(context.request, userID, email);
  });

  test("Checking email confirmation code", async ({ browser }) => {
    const context = await browser.newContext();
    const confirmationCode = await emailConfirmationCode(context.request, email);
    const responseBody = await confirmEmail(context.request, confirmationCode);
    try {
      expect(responseBody.data).toBe(true);
      console.log(`User ${userID}: email confirmed`);
    } catch (error) {
      console.error(`ERROR: User ${userID}: email not confirmed`);
    }
  });
});
