import { test, expect } from "@playwright/test";
import { createBUser } from "../bUserCreate/bUserCreateUtils";
import { updatePassword } from "./updatePasswordUtils";
import { globalData } from "../../../global.data";

test.describe("Checking update user password function", () => {
  let userID: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userID = String(createdUser);
  });

  test("Checking update user password function", async ({ browser }) => {
    const context = await browser.newContext();
    const responseBody = await updatePassword(context.request, userID, globalData.alternativePassword);
    expect(responseBody.data).toBe(true);
    console.log(`${userID}: password has been updated.`);
  });
});
