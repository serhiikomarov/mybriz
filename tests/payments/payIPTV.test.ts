import { test, expect } from '@playwright/test';
import { toPayAmountFunc, createBUser, getIPTVAccountID, addMoney, getCalculateIPTVfts, periodToPay, formatCurrency } from '../../fixtures';
import { LoginPage, MainPage, PaymentPage, ThankYouPage } from '../../pages';
import { texts, servicePrices, globalData } from '../../testData';

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
		await page.waitForLoadState('networkidle');
		await expect(paymentPage.pageTitle).toContainText(texts.ua.payment);
		await expect(paymentPage.serviceTitle).toContainText(texts.ua.iptv);
		await expect(paymentPage.serviceAmount).toContainText(`${servicePrices.briztv} ${texts.ua.uahMonth}`);
		await expect(paymentPage.currentPeriod).toContainText(`${currentPeriod}`);
		await paymentPage.setMonths(3);
		await page.waitForTimeout(2200);
	});
});
