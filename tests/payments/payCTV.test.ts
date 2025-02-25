import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/authPage';
import MainPage from '../../pages/mainPage';
import PaymentPage from '../../pages/paymentPage';
import ThankYouPage from '../../pages/thankYouPage';
import { globalData } from '../../fixtures/global.data';
import { createBUser } from '../../fixtures/billingApi/bUser/bUserCreate/bUserCreateUtils';
import { addMoney } from '../../fixtures/billingApi/bUser/addMoney/addMoneyUtils';
import { getCTVAccountID } from '../../fixtures/billingApi/CTVAccount/createCTVAccountUtils';
import { paymentCTVTest } from './paymentsFunctions';

test.describe('Pay CTV account', () => {
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
		paymentPage = new PaymentPage(page, ctvAccountID, 'ctv');
		paymentPageURL = paymentPage.pageUrl;
	});

	test('Pay CTV account for 1, 2, 3, 5, 6, 11, 12 months', async ({ page, browser }) => {
		test.setTimeout(60000);
		await paymentCTVTest(page, browser, loginPage, mainPage, paymentPage, thankYouPage, paymentPageURL, userID, ctvAccountID, 1);
		await paymentCTVTest(page, browser, loginPage, mainPage, paymentPage, thankYouPage, paymentPageURL, userID, ctvAccountID, 2);
		await paymentCTVTest(page, browser, loginPage, mainPage, paymentPage, thankYouPage, paymentPageURL, userID, ctvAccountID, 3);
		await paymentCTVTest(page, browser, loginPage, mainPage, paymentPage, thankYouPage, paymentPageURL, userID, ctvAccountID, 5);
		await paymentCTVTest(page, browser, loginPage, mainPage, paymentPage, thankYouPage, paymentPageURL, userID, ctvAccountID, 6);
		await paymentCTVTest(page, browser, loginPage, mainPage, paymentPage, thankYouPage, paymentPageURL, userID, ctvAccountID, 11);
		await paymentCTVTest(page, browser, loginPage, mainPage, paymentPage, thankYouPage, paymentPageURL, userID, ctvAccountID, 12);
	});
});
