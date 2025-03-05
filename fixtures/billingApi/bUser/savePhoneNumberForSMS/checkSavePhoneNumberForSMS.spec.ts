import { test } from "@playwright/test";
import { createBUser } from "../bUserCreate/bUserCreateUtils";
import { addPhoneNumber } from "./savePhoneNumberForSMSUtils";
import { generatePhoneNumber } from "../../../helpers";

test.describe("Checking addEmail function", () => {
  let userID: number;
  let phoneNumber: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userID = createdUser;
    phoneNumber = generatePhoneNumber();
  });

  test("Checking addEmail function", async ({ browser }) => {
    const context = await browser.newContext();
    const responseBody = await addPhoneNumber(context.request, userID, phoneNumber);
    console.log(userID, responseBody);
  });
});
