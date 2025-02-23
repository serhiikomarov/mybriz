import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/authPage";
import MainPage from "../../pages/mainPage";
import PaymentPage from "../../pages/paymentPage";
import ThankYouPage from "../../pages/thankYouPage";
import { globalData } from "../../fixtures/global.data";
import { createBUser } from "../../fixtures/billingApi/bUser/bUserCreate/bUserCreateUtils";
import { addMoney } from "../../fixtures/billingApi/bUser/addMoney/addMoneyUtils";
import { getCTVAccountID } from "../../fixtures/billingApi/CTVAccount/createCTVAccountUtils";
import { daysInMonth } from "../../fixtures/helpers";

test.describe("Pay CTV account", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let paymentPage: PaymentPage;
  let thankYouPage: ThankYouPage;
  let paymentPageURL: string;
  let userID: number;
  let ctvAccountID: number;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    userID = await createBUser(context.request);
    await await addMoney(context.request, userID, { amount: 10000 });
    await await addMoney(context.request, userID, { bonus: 10000 });
    ctvAccountID = await getCTVAccountID(context.request, userID);
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    paymentPage = new PaymentPage(page);
    thankYouPage = new ThankYouPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(String(userID), globalData.defaultPassword);
  });

  test("Cable TV payment", async ({ page }) => {
    const paymentPage = new PaymentPage(page, ctvAccountID, "ctv");
    const paymentPageURL = paymentPage.pageUrl;
    const daysInmonth = daysInMonth();
    await page.waitForURL(mainPage.pageUrl);
    await mainPage.goToPaymentButton.click();
    await page.waitForURL(paymentPageURL);
    await paymentPage.activateButton.click();
    await page.waitForTimeout(3000);
    await page.waitForURL(thankYouPage.successActivatedURL);
    await thankYouPage.toMainButton.click();
    await page.waitForTimeout(3000);
    console.log(daysInmonth);
  });
});
