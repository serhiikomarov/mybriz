import { test, expect } from "@playwright/test";
import LoginPage from "../pages/authPage";
import MainPage from "../pages/mainPage";
import { createBUser } from "../fixtures/billingApi/bUser/bUserCreate/bUserCreateUtils";

test.describe("Authorization by contract number and password", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let userId: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext(); // создаем контекст браузера
    const createdUser = await createBUser(context.request); // передаем объект request из контекста
    userId = String(createdUser); // сохраняем userId
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);

    await loginPage.navigateToLoginPage();
  });

  test("authByContractId правильный номер договора и пароль", async () => {
    await loginPage.login(userId, "123456");
  });
});
