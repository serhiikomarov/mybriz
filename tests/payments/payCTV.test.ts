import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/authPage";
import MainPage from "../../pages/mainPage";
import PaymentPage from "../../pages/paymentPage";
import { globalData } from "../../fixtures/global.data";
import { createBUser } from "../../fixtures/billingApi/bUser/bUserCreate/bUserCreateUtils";
import { addMoney } from "../../fixtures/billingApi/bUser/addMoney/addMoneyUtils";
import { createCTVAccount } from "../../fixtures/billingApi/CTVAccount/createCTVAccountUtils";

test.describe("Pay CTV account", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let paymentPage: PaymentPage;
  let userID: number;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    userID = await createBUser(context.request);
    await await addMoney(context.request, userID, { amount: 10000});
    await await addMoney(context.request, userID, { bonus: 10000});
    await createCTVAccount(context.request, userID)
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(String(userID), globalData.defaultPassword);
  });

  test("Cable TV payment", async ({ page }) => {
    console.log(userID);
  });
});
