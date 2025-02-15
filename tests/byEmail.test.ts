import { test, expect } from "@playwright/test";
import LoginPage from "../pages/authPage";
import MainPage from "../pages/mainPage";
import { globalData } from "../fixtures/global.data";
import { testData } from "../testData/test.data";
import { errorMessages } from "../testData/errors.data";
import { createBUser } from "../fixtures/billingApi/bUser/bUserCreate/bUserCreateUtils";
import { addEmail } from "../fixtures/billingApi/bUser/setEmail/setEmailUtils";
import { emailConfirmationCode } from "../fixtures/billingApi/bEmail/lastEmailCode/lastEmailCodeUtils";
import { confirmEmail } from "../fixtures/billingApi/bEmail/confirmEmail/confirmEmailUtils";
import { generateRandomEmail } from "../fixtures/helpers";

test.describe("Authorization by email and password", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let userID: string;
  let email: string;
  let code: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    // create user and get contract ID
    userID = String(await createBUser(context.request));
    // generate email
    email = generateRandomEmail();
    // add email to user
    await addEmail(context.request, userID, email);
    // get confirmation code
    code = await emailConfirmationCode(context.request, email);
    // confirm email
    await confirmEmail(context.request, code);
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Authorization by email and password correct data", async ({ page }) => {
    await loginPage.login(email, globalData.defaultPassword);
    await page.waitForURL(mainPage.pageUrl);
  });
});

// Заполнить только поле Email, а поле Password оставить пустым.

// Тестирование некорректных данных / например, test@com или test.com).

// Ввести неверный Email, которые не существуют в базе).

// Тестирование формата и символов / Ввести в поле Email специальные символы или пробелы

// Ввести в поле Password специальные символы, чтобы проверить обработку (например, @#12abcd).

//SQL-инъекцию или XSS-атаки в поля Email и Password (например, <script>alert('XSS')</script>).
