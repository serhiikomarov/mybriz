import { test, expect } from "@playwright/test";
import LoginPage from "../pages/authPage";
import MainPage from "../pages/mainPage";
import { createBUser } from "../fixtures/billingAPI/bUser/bUserCreate/bUserCreateUtils";
import { globalData } from "../fixtures/global.data";
import { defaultUserCreateObj } from "../fixtures/billingAPI/bUser/bUserCreate/bUserCreate.data";
import { errorMessages } from "../testData/errors.data";
import { testData } from "../testData/test.data";
import { updatePassword } from "../fixtures/billingAPI/bUser/updatePassword/updatePasswordUtils";

test.describe("Authorization by contract number and password", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let userID1: string;
  let userID2: string;
  let userID3: string;
  let modifiedPassword: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    // Create user with defaultPassword (6-digit password)
    userID1 = String(await createBUser(context.request));
    // Create user with alterativePassword (digits and lowercase letters)
    userID2 = String(await createBUser(context.request));
    await updatePassword(context.request, userID2, globalData.alternativePassword);
    // Create user with maxLengthPassword (16-character password)
    userID3 = String(await createBUser(context.request));
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Authorization by contract number and password with correct credentials", async ({ page }) => {
    await loginPage.login(userID1, globalData.defaultPassword);
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
});

// Позитивные

// 1. Авторизация с правильными данными +
// 2. Проверка пароля с учетом регистра +
// 3. Авторизация с минимально допустимы данными
// 4. Авторизация с максимально допустимыми данными

// Негативные

// 1. Пустые инпуты (пустой логин / пустой пароль)
// 2. Неправильный логин
// 4. Логин с пробелами в начале или в конце
// 5. Пароль с пробелами в начале или в конце
// 6. Поменять пароль и логин местами

// Граничные

// 1. Логин короче
// 2. Логин длиннее
// 3. Пароль короче
// 4. Пароль длиннее

// Дополнительные

// Проверка при нажатии Enter
// Проверка маскирования пароля
