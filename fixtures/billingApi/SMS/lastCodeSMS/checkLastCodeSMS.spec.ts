import { test } from "@playwright/test";
import { createBUser, addPhoneNumber } from "../../bUser";
import { generatePhoneNumber } from "../../../helpers";
import { checkLastCodeSMS } from "./lastCodeSMSUtils";

test.describe("Checking SMS code", () => {
  let userID: number;
  let phoneNumber: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userID = createdUser;
    phoneNumber = generatePhoneNumber();
    await addPhoneNumber(context.request, userID, phoneNumber);
  });

  test("Checking email confirmation code", async ({ browser }) => {
    const context = await browser.newContext();
    const responseBody = await checkLastCodeSMS(context.request, phoneNumber);
    console.log(userID, responseBody);
  });
});
