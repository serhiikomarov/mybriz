import { test, expect } from "@playwright/test";
import LoginPage from "../pages/authPage";
import MainPage from "../pages/mainPage";
import { createBUser } from "../fixtures/billingApi/bUser/bUserCreate/bUserCreateUtils";
import { globalData } from "../fixtures/global.data";
import { defaultUserCreateObj } from "../fixtures/billingApi/bUser/bUserCreate/bUserCreate.data";
import { errorMessages } from "../testData/errors.data";

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
    const userDataObj = { ...defaultUserCreateObj, ...modifiedData };
    const context = await browser.newContext();
    const createdUser = await createBUser(context.request, userDataObj);
    userID = String(createdUser);
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Authorization by contract number and password with correct credentials", async ({ page }) => {
    await loginPage.login(userID, modifiedPassword);
    await page.waitForURL(mainPage.pageUrl);
  });

  test("Authorization by contract number and password case-sensitive password check", async ({ page }) => {
    await loginPage.login(userID, modifiedPassword.toUpperCase());
    await expect(loginPage.usernameInputHelper).toContainText(errorMessages.ua.undefinedUser);
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
