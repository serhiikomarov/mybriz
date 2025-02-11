import { test, expect } from "@playwright/test";
import LoginPage from "../pages/authPage";
import MainPage from "../pages/mainPage";
import { createBUser } from "../fixtures/billingApi/bUser/bUserCreate/bUserCreateUtils";
import { globalData } from "../fixtures/global.data";
import { defaultUserCreateObj } from "../fixtures/billingApi/bUser/bUserCreate/bUserCreate.data";

test.describe("Authorization by contract number and password", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let userID: string;
  let modifiedPassword: string;

  test.beforeAll(async ({ browser }) => {
    modifiedPassword = "password112233";
    const modifiedData = {
      Password: modifiedPassword,
    };
    const context = await browser.newContext();
    const userDataObj = { ...defaultUserCreateObj, ...modifiedData };
    const createdUser = await createBUser(context.request, userDataObj);
    userID = String(createdUser);
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Authorization by contract number and password with correct credentials", async ({
    page,
  }) => {
    await loginPage.login(userID, modifiedPassword);
    await page.waitForURL(mainPage.pageUrl);
    const currentUrl = page.url();
    expect(currentUrl).toBe(mainPage.pageUrl);
  });
});

//   test("Authorization by contract number and password with incorrect contract number and valid password", async () => {
//     await loginPage.login(userId, globalData.wrongValidPassword);
//   });
