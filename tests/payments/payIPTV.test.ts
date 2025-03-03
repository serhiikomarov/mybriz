import { test } from '@playwright/test';
import { globalData, createBUser, getIPTVAccountID, addMoney, getCalculateIPTVfts, periodToPay } from '../../fixtures';
import { LoginPage, MainPage, PaymentPage, ThankYouPage } from '../../pages';
import { toPayAmountFunc, servicePrices } from '../../testData';

test.describe('Pay IPTV account', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	let paymentPage: PaymentPage;
	let thankYouPage: ThankYouPage;
	let paymentPageURL: string;
	let userID: number;
	let IPTVAccountID: number;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		userID = await createBUser(context.request);
		await await addMoney(context.request, userID, { amount: 10000 });
		await await addMoney(context.request, userID, { amount: 10000 });
		IPTVAccountID = await getIPTVAccountID(context.request, userID);
	});

	test.beforeEach(async ({ page }) => {
		test.setTimeout(90000);
		loginPage = new LoginPage(page);
		mainPage = new MainPage(page);
		paymentPage = new PaymentPage(page);
		thankYouPage = new ThankYouPage(page);
		await loginPage.navigateToLoginPage();
		await loginPage.login(String(userID), globalData.defaultPassword);
		paymentPage = new PaymentPage(page, IPTVAccountID, 'iptv');
		paymentPageURL = paymentPage.pageUrl;
	});

	test('Pay IPTV account', async ({ page, browser }) => {
		await page.waitForURL(mainPage.pageUrl);
		await mainPage.goToPaymentButton.click();
		await page.waitForURL(paymentPageURL);
		const context = await browser.newContext();
		let fts = await getCalculateIPTVfts(context.request, userID, IPTVAccountID);
		let servicePrice = servicePrices.briztv;
		let currentPeriod = periodToPay(fts);
		let toPayAmount = toPayAmountFunc(1, servicePrice);
		// await expect(paymentPage.pageTitle).toContainText(texts.ua.payment);
		// await expect(paymentPage.serviceTitle).toContainText(texts.ua.ctv);
		// await expect(paymentPage.serviceAmount).toContainText(`${servicePrices.ctv} ${texts.ua.uahMonth}`);
		// await expect(paymentPage.currentPeriod).toContainText(`${currentPeriod}`);
		await paymentPage.setSliderPosition(1);
		//await paymentPage.spoilerButton.click();

		// let toPayAmount = toPayAmountFunc(months);
		// await expect(paymentPage.pageTitle).toContainText(texts.ua.payment);
		// await expect(paymentPage.serviceTitle).toContainText(texts.ua.ctv);
		// await expect(paymentPage.serviceAmount).toContainText(`${servicePrices.ctv} ${texts.ua.uahMonth}`);
		// await expect(paymentPage.currentPeriod).toContainText(`${currentPeriod}`);
		// await paymentPage.setSliderPosition(months);
		// await paymentPage.spoilerButton.click();
		// await expect(paymentPage.checkoutMainField).toContainText(texts.ua.checkout);
		// await expect(paymentPage.checkoutMainValue).toContainText(`0.00 грн`);
		// await expect(paymentPage.mainServiceField).toContainText(texts.ua.ctv);
		// await expect(paymentPage.mainServiceValue).toContainText(`${formatCurrency(toPayAmount)} грн`);
		// await expect(paymentPage.cashWithdrawalField).toContainText(texts.ua.cashWithdrawal);
		// await expect(paymentPage.cashWithdrawalValue).toContainText(`-${formatCurrency(toPayAmount)} грн`);
		// await expect(paymentPage.checkoutField).toContainText(texts.ua.checkout);
		// await expect(paymentPage.checkoutValue).toContainText(`0.00 грн`);
		await paymentPage.activateButton.click();
		// await page.waitForURL(thankYouPage.successActivatedURL);
		// await thankYouPage.toMainButton.click();
		// await page.waitForURL(mainPage.pageUrl);
	});
});
