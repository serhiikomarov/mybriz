import { test, expect } from "@playwright/test";
import { LoginPage, MainPage, AuthWithSMSPage, AuthWithSMSCodePage } from "../../pages";
import { createBUser, generatePhoneNumber, addPhoneNumber, waitForSMSCode } from "../../fixtures";
import { testData, errorMessages, globalData } from "../../testData";

test.describe("Authorization by SMS with contract ID", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let authWithSMSPage: AuthWithSMSPage;
  let authWithSMSCodePage: AuthWithSMSCodePage;
  let userID: number;
  let phoneNumber: string;
  let codeFromSMS: string;

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
    authWithSMSPage = new AuthWithSMSPage(page);
    authWithSMSCodePage = new AuthWithSMSCodePage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.authWithSMSButton.click();
  });

  test("Authorization by SMS with correct contract ID", async ({ page, request }) => {
    await authWithSMSPage.sendSMS(phoneNumber);
    codeFromSMS = await waitForSMSCode(request, phoneNumber);
    authWithSMSCodePage.enterCodeFromSMS(codeFromSMS);
    await page.waitForTimeout(1500);
    await authWithSMSCodePage.logInButton.click();
    await page.waitForURL(mainPage.pageUrl);
    await page.waitForTimeout(4000);
  });
});
