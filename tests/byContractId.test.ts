import { test, expect } from "@playwright/test";
import LoginPage from "../pages/authPage";
import MainPage from "../pages/mainPage";
import { globalData } from "../fixtures/global.data";
import { testData } from "../testData/test.data";
import { errorMessages } from "../testData/errors.data";
import { createBUser } from "../fixtures/billingApi/bUser/bUserCreate/bUserCreateUtils";
import { updatePassword } from "../fixtures/billingApi/bUser/updatePassword/updatePasswordUtils";

test.describe("Authorization by contract number and password", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let userID1: string;
  let userID2: string;
  let userID3: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    // Create user with defaultPassword (6-digit password)
    userID1 = String(await createBUser(context.request));
    // Create user with alterativePassword (digits and lowercase letters)
    userID2 = String(await createBUser(context.request));
    await updatePassword(context.request, userID2, globalData.alternativePassword);
    // Create user with maxLengthPassword (16-character password)
    userID3 = String(await createBUser(context.request));
    await updatePassword(context.request, userID3, globalData.maxLengthPassword);
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Authorization by contract number and password with minimum length password", async ({ page }) => {
    await loginPage.login(userID1, globalData.defaultPassword);
    await page.waitForURL(mainPage.pageUrl);
  });

  test("Authorization by contract number and password with the maximum length password", async ({ page }) => {
    await loginPage.login(userID3, globalData.maxLengthPassword);
    await page.waitForURL(mainPage.pageUrl);
  });

  test("Authorization by contract number and password case-sensitive password check UA", async () => {
    await loginPage.login(userID2, globalData.alternativePassword.toUpperCase());
    await expect(loginPage.usernameInputHelper).toContainText(errorMessages.ua.undefinedUser);
  });

  test("Authorization by contract number and password case-sensitive password check EN", async ({ page }) => {
    await page.goto(`${loginPage.pageUrl}${testData.languageEN}`);
    await loginPage.login(userID2, globalData.alternativePassword.toUpperCase());
    await expect(loginPage.usernameInputHelper).toContainText(errorMessages.en.undefinedUser);
  });

  test("Authorization by contract number and invalid short password UA", async () => {
    await loginPage.login(userID1, globalData.invalid5DigitsPassword);
    await expect(loginPage.passwordInputHelper).toContainText(errorMessages.ua.passwordIsShort);
  });

  test("Authorization by contract number and invalid short password EN", async ({ page }) => {
    await page.goto(`${loginPage.pageUrl}${testData.languageEN}`);
    await loginPage.login(userID1, globalData.invalid5DigitsPassword);
    await expect(loginPage.passwordInputHelper).toContainText(errorMessages.en.passwordIsShort);
  });

  test("Authorization by contract number and invalid long password UA", async () => {
    await loginPage.login(userID1, globalData.invalid17DigitsPassword);
    await expect(loginPage.passwordInputHelper).toContainText(errorMessages.ua.passwordIsLong);
  });

  test("Authorization by contract number and invalid long password EN", async ({ page }) => {
    await page.goto(`${loginPage.pageUrl}${testData.languageEN}`);
    await loginPage.login(userID1, globalData.invalid17DigitsPassword);
    await expect(loginPage.passwordInputHelper).toContainText(errorMessages.en.passwordIsLong);
  });

  test("Authorization by contract number and password with swapped login and password fields", async () => {
    await loginPage.login(globalData.defaultPassword, userID1);
    await expect(loginPage.usernameInputHelper).toContainText(errorMessages.ua.undefinedUser);
  });

  test("Authorization by contract number and password with empty inputs UA", async () => {
    await loginPage.login(globalData.emptyString, globalData.emptyString);
    await expect(loginPage.usernameInputHelper).toContainText(errorMessages.ua.fieldRequired);
    await expect(loginPage.passwordInputHelper).toContainText(errorMessages.ua.fieldRequired);
  });

  test("Authorization by contract number and password with empty inputs EN", async ({ page }) => {
    await page.goto(`${loginPage.pageUrl}${testData.languageEN}`);
    await loginPage.login(globalData.emptyString, globalData.emptyString);
    await expect(loginPage.usernameInputHelper).toContainText(errorMessages.en.fieldRequired);
    await expect(loginPage.passwordInputHelper).toContainText(errorMessages.en.fieldRequired);
  });
});

// Негативные:
// - логин с пробелами в начале или в конце
// - пароль с пробелами в начале или в конце

// Граничные:
// - логин короче
// - логин длиннее (неверное значение)

// Дополнительные:
// - проверка при нажатии Enter
// - проверка маскирования пароля
