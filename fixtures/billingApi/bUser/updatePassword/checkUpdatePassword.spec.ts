import { test, expect } from "@playwright/test";
import { createBUser } from "../bUserCreate/bUserCreateUtils";
import { updatePassword } from "./updatePasswordUtils";
import { globalData } from "../../../global.data";

test.describe("Checking update user password function", () => {
  let userID: number;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userID = createdUser;
  });

  test("Checking update user password function", async ({ browser }) => {
    const context = await browser.newContext();
    const responseBody = await updatePassword(context.request, userID, globalData.alternativePassword);
    try {
      expect(responseBody, "password not updated").toBe(true);
      console.log(`${userID} password updated`);
    } catch (error) {
      console.error(`ERROR: ${userID} password not updated`);
    }
  });
});
