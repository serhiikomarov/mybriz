import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/authPage";
import MainPage from "../../pages/mainPage";
import PaymentPage from "../../pages/paymentPage";
import ThankYouPage from "../../pages/thankYouPage";
import { globalData } from "../../fixtures/global.data";
import { createBUser } from "../../fixtures/billingApi/bUser/bUserCreate/bUserCreateUtils";
import { addMoney } from "../../fixtures/billingApi/bUser/addMoney/addMoneyUtils";
import { getCTVAccountID } from "../../fixtures/billingApi/CTVAccount/createCTVAccountUtils";
import { daysInMonth, remainingDaysInMonth } from "../../fixtures/helpers";
import { serviceNames, servicePrices } from "../../testData/services.data";
import { texts } from "../../testData/texts.data";

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
    const remainingPeriodPrice = ((servicePrices.ctv / daysInMonth()) * remainingDaysInMonth()).toFixed(2);
    await page.waitForURL(mainPage.pageUrl);
    await mainPage.goToPaymentButton.click();
    await page.waitForURL(paymentPageURL);
    await expect(paymentPage.pageTitle).toContainText(texts.ua.payment);
    await expect(paymentPage.serviceTitle).toContainText(texts.ua.ctv);
    await expect(paymentPage.serviceAmount).toContainText(`${servicePrices.ctv} ${texts.ua.uahMonth}`);
    await paymentPage.activateButton.click();
    await page.waitForURL(thankYouPage.successActivatedURL);
    await thankYouPage.toMainButton.click();
  });
});
