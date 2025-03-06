import { test } from "@playwright/test";
import { createBUser, getCTVAccountID, addMoney } from "../../fixtures";
import { LoginPage, MainPage, PaymentPage, ThankYouPage } from "../../pages";
import { runCTVPaymentFlow } from "./paymentsFunctions";
import { globalData } from "../../testData";

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
    await await addMoney(context.request, userID, { amount: 20000 });
    ctvAccountID = await getCTVAccountID(context.request, userID);
  });

  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    paymentPage = new PaymentPage(page);
    thankYouPage = new ThankYouPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(String(userID), globalData.defaultPassword);
    paymentPage = new PaymentPage(page, ctvAccountID, "ctv");
    paymentPageURL = paymentPage.pageUrl;
  });

  test("Pay CTV account for 1 to 12 months", async ({ page, browser }) => {
    for (let months = 1; months <= 12; months++) {
      await runCTVPaymentFlow(
        months,
        page,
        browser,
        loginPage,
        mainPage,
        paymentPage,
        thankYouPage,
        paymentPageURL,
        userID,
        ctvAccountID
      );
    }
  });
});
