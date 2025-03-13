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

  test("Authorization by SMS with correct contract ID and correct code from SMS", async ({ page, request }) => {
    await authWithSMSPage.sendSMS(String(userID));
    codeFromSMS = await waitForSMSCode(request, phoneNumber);
    authWithSMSCodePage.enterCodeFromSMS(codeFromSMS);
    await authWithSMSCodePage.logInButton.click();
    await page.waitForURL(mainPage.pageUrl);
  });

  /* 
  пустой инпут
  короткий номер договора
  несуществующий номер договора
  номер договора без СМС профиля
  */

  test("Authorization by SMS with empty input UA", async ({ page }) => {
    await authWithSMSPage.sendSMS(String(""));
    await page.waitForTimeout(2000);
    await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.ua.fieldRequired);
  });

  test("Authorization by SMS with empty input EN", async ({ page }) => {
    await page.goto(`${authWithSMSPage.pageUrl}${testData.languageEN}`);
    await page.waitForTimeout(2000);
    await authWithSMSPage.sendSMS(String(""));
    await page.waitForTimeout(2000);
    await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.en.fieldRequired);
  });

  // test("Authorization by phone number starts with 8", async ({ page }) => {});

  // test("Authorization by phone number starts with 38", async ({ page }) => {});
});
