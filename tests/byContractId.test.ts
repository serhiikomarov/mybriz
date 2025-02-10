import { test, expect } from "@playwright/test";
import LoginPage from "../pages/authPage";
import MainPage from "../pages/mainPage";
import { createBUser } from "../fixtures/billingApi/bUser/bUserCreate/bUserCreateUtils";
import { globalData } from "../fixtures/global.data";

test.describe("Authorization by contract number and password", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let userId: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request);
    userId = String(createdUser);
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);

    await loginPage.navigateToLoginPage();
  });

  test("Authorization by contract number and password with correct credentials", async ({
    page,
  }) => {
    await loginPage.login(userId, globalData.defaultPassword);
    await page.waitForURL(mainPage.pageUrl);
    const currentUrl = page.url();
    expect(currentUrl).toBe(mainPage.pageUrl);
  });
});

//   test("Authorization by contract number and password with incorrect contract number and valid password", async () => {
//     await loginPage.login(userId, globalData.wrongValidPassword);
//   });
