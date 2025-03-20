import { test, expect } from "@playwright/test";
import { LoginPage, MainPage } from "../../pages";
import { createBUser, generatePhoneNumber, addPhoneNumber } from "../../fixtures";
import { testData, errorMessages, globalData } from "../../testData";

test.describe("Authorization by login with phone number", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let userID: number;
  let phoneNumber: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();

    // Create user and get contract ID
    userID = await createBUser(context.request);

    // Generate phone number
    phoneNumber = generatePhoneNumber();

    // Add phone number to user
    await addPhoneNumber(context.request, userID, phoneNumber);
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Authorization by phone number and password use correct data", async ({ page }) => {
    await loginPage.login(phoneNumber, globalData.defaultPassword);
    await page.waitForURL(mainPage.pageUrl);
  });
});
