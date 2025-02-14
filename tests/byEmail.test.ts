import { test, expect } from "@playwright/test";
import LoginPage from "../pages/authPage";
import MainPage from "../pages/mainPage";
import { globalData } from "../fixtures/global.data";
import { testData } from "../testData/test.data";
import { errorMessages } from "../testData/errors.data";
import { createBUser } from "../fixtures/billingApi/bUser/bUserCreate/bUserCreateUtils";
import { updatePassword } from "../fixtures/billingApi/bUser/updatePassword/updatePasswordUtils";

test.describe("Authorization by email and password", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let userID: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    userID = String(await createBUser(context.request));
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Authorization by contract number and password with minimum length password", async ({ page }) => {
    await loginPage.login(userID, globalData.defaultPassword);
    await page.waitForURL(mainPage.pageUrl);
  });
});
