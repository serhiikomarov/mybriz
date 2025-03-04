import { Browser, expect, Page } from "@playwright/test";
import { periodToPay, formatCurrency, getCalculateCTVfts } from "../../fixtures";
import { LoginPage, MainPage, PaymentPage, ThankYouPage } from "../../pages";
import { servicePrices, texts } from "../../testData";
import { toPayAmountFunc } from "../../testData";

export async function runCTVPaymentFlow(
  months: number,
  page: Page,
  browser: Browser,
  loginPage: LoginPage,
  mainPage: MainPage,
  paymentPage: PaymentPage,
  thankYouPage: ThankYouPage,
  paymentPageURL: string,
  userID: number,
  ctvAccountID: number
) {
  // Check params
  if (
    !months ||
    !page ||
    !browser ||
    !loginPage ||
    !mainPage ||
    !paymentPage ||
    !thankYouPage ||
    userID === undefined ||
    ctvAccountID === undefined
  ) {
    throw new Error("Not all required parameters were passed to paymentCTVTest.");
  }

  await page.waitForURL(mainPage.pageUrl);
  await mainPage.goToPaymentButton.click();
  await page.waitForURL(paymentPageURL);
  const context = await browser.newContext();
  let fts = await getCalculateCTVfts(context.request, userID, ctvAccountID);
  let servicePrice = servicePrices.ctv;
  let currentPeriod = periodToPay(fts);
  let toPayAmount = toPayAmountFunc(months, servicePrice);
  await expect(paymentPage.pageTitle).toContainText(texts.ua.payment);
  await expect(paymentPage.serviceTitle).toContainText(texts.ua.ctv);
  await expect(paymentPage.serviceAmount).toContainText(`${servicePrices.ctv} ${texts.ua.uahMonth}`);
  await expect(paymentPage.currentPeriod).toContainText(`${currentPeriod}`);
  await paymentPage.setSliderPosition(months);
  await expect(paymentPage.numberOfMonths).toContainText(`${months}`);
  await paymentPage.spoilerButton.click();
  await expect(paymentPage.checkoutMainField).toContainText(texts.ua.checkout);
  await expect(paymentPage.checkoutMainValue).toContainText(`0.00 грн`);
  await expect(paymentPage.mainServiceField).toContainText(texts.ua.ctv);
  await expect(paymentPage.mainServiceValue).toContainText(`${formatCurrency(toPayAmount)} грн`);
  await expect(paymentPage.cashWithdrawalField).toContainText(texts.ua.cashWithdrawal);
  await expect(paymentPage.cashWithdrawalValue).toContainText(`-${formatCurrency(toPayAmount)} грн`);
  await expect(paymentPage.checkoutField).toContainText(texts.ua.checkout);
  await expect(paymentPage.checkoutValue).toContainText(`0.00 грн`);
  await paymentPage.activateButton.click();
  await page.waitForURL(thankYouPage.successActivatedURL);
  await thankYouPage.toMainButton.click();
  await page.waitForURL(mainPage.pageUrl);
}
