import { test, expect } from "@playwright/test";
import { LoginPage, MainPage, AuthTwoFactorPage } from "../../pages";
import {
  createBUser,
  generatePhoneNumber,
  addPhoneNumber,
  getInternetAccountID,
  generateLogin,
  changeLanguage,
  getPhoneMask,
  waitForSMSCode,
} from "../../fixtures";
import { setLanguage, errorMessages, globalData } from "../../testData";

test.describe("Authorization by login with phone number", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let authTwoFactorPage: AuthTwoFactorPage;
  let userID: number;
  let userID2: number;
  let userID3: number;
  let internetLogin: string;
  let internetLogin2: string;
  let internetLogin3: string;
  let phoneNumber: string;
  let phoneNumber2: string;
  let codeFromSMS: string;
  let phoneNumber3: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();

    // --- Сreating the first user with a phone number ---
    userID = await createBUser(context.request);
    internetLogin = generateLogin(10);
    await getInternetAccountID(context.request, userID, internetLogin);
    phoneNumber = generatePhoneNumber();
    await addPhoneNumber(context.request, userID, phoneNumber);

    // --- Сreating a second user with a phone number ---
    userID2 = await createBUser(context.request);
    internetLogin2 = generateLogin(10);
    await getInternetAccountID(context.request, userID2, internetLogin2);
    phoneNumber2 = generatePhoneNumber();
    await addPhoneNumber(context.request, userID2, phoneNumber2);

    // --- Creating a third user with a phone number ---
    userID3 = await createBUser(context.request);
    internetLogin3 = generateLogin(10);
    await getInternetAccountID(context.request, userID3, internetLogin3);
    phoneNumber3 = generatePhoneNumber();
    await addPhoneNumber(context.request, userID3, phoneNumber3);
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    authTwoFactorPage = new AuthTwoFactorPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Authorization by login with phone number and correct data", async ({ page, request }) => {
    await loginPage.login(internetLogin, globalData.defaultInternetPassword);
    await page.waitForURL(authTwoFactorPage.pageUrl);
    // Checking 2FA (phone number page) texts and elements in Ukrainian localization
    await expect(authTwoFactorPage.backButton).toHaveText(authTwoFactorPage.texts.ua.backButton);
    await expect(authTwoFactorPage.title).toHaveText(authTwoFactorPage.texts.ua.title);
    await expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.ua.phoneNumberDiscription);
    await expect(authTwoFactorPage.phoneFormText).toHaveText(authTwoFactorPage.texts.ua.phoneFormText);
    const phoneMask = getPhoneMask(phoneNumber);
    await expect(authTwoFactorPage.maskedPhoneNumber).toHaveText(phoneMask);
    await expect(authTwoFactorPage.changePhoneNumberButton).toHaveText(
      authTwoFactorPage.texts.ua.changePhoneNumberButton
    );
    await expect(authTwoFactorPage.sendCodeButton).toHaveText(authTwoFactorPage.texts.ua.sendCodeButtonText);
    await expect(authTwoFactorPage.socialsText).toHaveText(authTwoFactorPage.texts.ua.socialsText);
    expect(authTwoFactorPage.appleIDAuthButton).toBeVisible();
    expect(authTwoFactorPage.googleAuthButton).toBeVisible();
    expect(authTwoFactorPage.facebookAuthButton).toBeVisible();
    // Checking 2FA (phone number page) texts and elements in English localization
    await changeLanguage(page, setLanguage.en);
    await expect(authTwoFactorPage.backButton).toHaveText(authTwoFactorPage.texts.en.backButton);
    await expect(authTwoFactorPage.title).toHaveText(authTwoFactorPage.texts.en.title);
    await expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.en.phoneNumberDiscription);
    await expect(authTwoFactorPage.phoneFormText).toHaveText(authTwoFactorPage.texts.en.phoneFormText);
    await expect(authTwoFactorPage.maskedPhoneNumber).toHaveText(phoneMask);
    await expect(authTwoFactorPage.changePhoneNumberButton).toHaveText(
      authTwoFactorPage.texts.en.changePhoneNumberButton
    );
    await expect(authTwoFactorPage.sendCodeButton).toHaveText(authTwoFactorPage.texts.en.sendCodeButtonText);
    await expect(authTwoFactorPage.socialsText).toHaveText(authTwoFactorPage.texts.en.socialsText);
    expect(authTwoFactorPage.appleIDAuthButton).toBeVisible();
    expect(authTwoFactorPage.googleAuthButton).toBeVisible();
    expect(authTwoFactorPage.facebookAuthButton).toBeVisible();
    await authTwoFactorPage.sendCodeButton.click();
    // Checking 2FA (code from SMS page) texts and elements in Ukrainian localization
    await changeLanguage(page, setLanguage.ua);
    await expect(authTwoFactorPage.backButton).toHaveText(authTwoFactorPage.texts.ua.backButton);
    await expect(authTwoFactorPage.title).toHaveText(authTwoFactorPage.texts.ua.title);
    await expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.ua.codeFromSMSDiscription);
    await expect(authTwoFactorPage.logInButton).toHaveText(authTwoFactorPage.texts.ua.loginButtonText);
    await expect(authTwoFactorPage.socialsText).toHaveText(authTwoFactorPage.texts.ua.socialsText);
    expect(authTwoFactorPage.appleIDAuthButton).toBeVisible();
    expect(authTwoFactorPage.googleAuthButton).toBeVisible();
    expect(authTwoFactorPage.facebookAuthButton).toBeVisible();
    // Checking 2FA (code from SMS page) texts and elements in English localization
    await changeLanguage(page, setLanguage.en);
    await expect(authTwoFactorPage.backButton).toHaveText(authTwoFactorPage.texts.en.backButton);
    await expect(authTwoFactorPage.title).toHaveText(authTwoFactorPage.texts.en.title);
    await expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.en.codeFromSMSDiscription);
    await expect(authTwoFactorPage.logInButton).toHaveText(authTwoFactorPage.texts.en.loginButtonText);
    await expect(authTwoFactorPage.socialsText).toHaveText(authTwoFactorPage.texts.en.socialsText);
    expect(authTwoFactorPage.appleIDAuthButton).toBeVisible();
    expect(authTwoFactorPage.googleAuthButton).toBeVisible();
    expect(authTwoFactorPage.facebookAuthButton).toBeVisible();
    codeFromSMS = await waitForSMSCode(request, phoneNumber);
    await authTwoFactorPage.enterCodeFromSMS(codeFromSMS);
    await expect(authTwoFactorPage.codeInputFourthDigit).toHaveValue(Array.from(codeFromSMS)[3]);
    await authTwoFactorPage.logInButton.click();
    await page.waitForURL(mainPage.pageUrl);
  });

  test("Authorization by login with incorrect password", async ({ page }) => {
    await loginPage.login(internetLogin, globalData.defaultPassword);
    // Checking the error in the login input in Ukrainian localization
    await expect(loginPage.usernameInputHelper).toContainText(errorMessages.ua.undefinedUser);
    // Checking the error in the login input in English localization
    await changeLanguage(page, setLanguage.en);
    await loginPage.loginButton.click();
    await expect(loginPage.usernameInputHelper).toContainText(errorMessages.en.undefinedUser);
  });

  test("Authorization by login attempt using phone number from different account", async ({ page }) => {
    await loginPage.login(internetLogin, globalData.defaultInternetPassword);
    await page.waitForURL(authTwoFactorPage.pageUrl);
    await page.waitForLoadState("networkidle");
    await authTwoFactorPage.changePhoneNumberButton.click();
    await authTwoFactorPage.phoneNumberInput.fill(phoneNumber2);
    // Checking the error in the phone number input in Ukrainian localization
    await authTwoFactorPage.sendCodeButton.click();
    await expect(authTwoFactorPage.inputHelper).toContainText(errorMessages.ua.usedPhoneNumber);
    // Checking the error in the phone number input in English localization
    await changeLanguage(page, setLanguage.en);
    await authTwoFactorPage.sendCodeButton.click();
    await expect(authTwoFactorPage.inputHelper).toContainText(errorMessages.en.usedPhoneNumber);
  });

  test("Authorization by login success change phone number flow", async ({ page, request }) => {
    await loginPage.login(internetLogin3, globalData.defaultInternetPassword);
    await page.waitForURL(authTwoFactorPage.pageUrl);
    await page.waitForLoadState("networkidle");
    await authTwoFactorPage.changePhoneNumberButton.click();
    const newPhoneNumber = generatePhoneNumber();
    await authTwoFactorPage.phoneNumberInput.fill(newPhoneNumber);
    await authTwoFactorPage.sendCodeButton.click();
    codeFromSMS = await waitForSMSCode(request, newPhoneNumber);
    await authTwoFactorPage.enterCodeFromSMS(codeFromSMS);
    await authTwoFactorPage.logInButton.click();
    await page.waitForURL(mainPage.pageUrl);
  });

  test("Authorization by login attempt use invalid phone number", async ({ page, request }) => {
    await loginPage.login(internetLogin3, globalData.defaultInternetPassword);
    await page.waitForURL(authTwoFactorPage.pageUrl);
    await page.waitForLoadState("networkidle");
    await authTwoFactorPage.changePhoneNumberButton.click();
    await authTwoFactorPage.phoneNumberInput.fill(globalData.incorrectFormatPhoneNumber);
    // Checking the error in the phone number input in Ukrainian localization
    await authTwoFactorPage.sendCodeButton.click();
    await expect(authTwoFactorPage.inputHelper).toContainText(errorMessages.ua.incorrectFormatPhoneNumber);
    // Checking the error in the phone number input in English localization
    await changeLanguage(page, setLanguage.en);
    await authTwoFactorPage.sendCodeButton.click();
    await expect(authTwoFactorPage.inputHelper).toContainText(errorMessages.en.incorrectFormatPhoneNumber);
  });
});
