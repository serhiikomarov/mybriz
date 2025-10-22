import { test, expect } from '@playwright/test';
import { LoginPage, MainPage } from '../../pages';
import { updatePassword, createBUser, changeLanguage, createInternetAccount, generateLogin } from '../../fixtures';
import { setLanguage, errorMessages, globalData } from '../../testData';

test.describe('kjsdkljfksldjflks sfd sd', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	let userID1: number;
	let userID2: number;
	let userID3: number;
	let userID4: number;
	let userID5: number;
	let userID6: number;
	let userID7: number;
	let internetLogin1: string;
	let internetLogin2: string;
	let internetLogin3: string;
	let internetLogin4: string;
	let internetLogin5: string;
	let internetLogin6: string;
	let internetLogin7: string;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();

		// Create Account #1 - Администратор
		userID1 = await createBUser(context.request);
		internetLogin1 = generateLogin(10);
		console.log('\x1b[33m%s\x1b[0m', `Аккаунт 1 http://dbilling.briz.ua/Ru/billing/user/view.html?uid=${userID1}`);

		// Create Account #2
		userID2 = await createBUser(context.request);
		internetLogin2 = generateLogin(10);
		console.log('\x1b[33m%s\x1b[0m', `Аккаунт 2 http://dbilling.briz.ua/Ru/billing/user/view.html?uid=${userID2}`);

		/* Create Account #3
		userID3 = await createBUser(context.request);
		internetLogin3 = generateLogin(10);
		console.log(`Аккаунт 3 ${userID3}`);

		// Create Account #4
		userID4 = await createBUser(context.request);
		internetLogin4 = generateLogin(10);
		console.log(`Аккаунт 4 ${userID4}`);

		// Create Account #5
		userID5 = await createBUser(context.request);
		internetLogin5 = generateLogin(10);
		console.log(`Аккаунт 5 ${userID5}`);

		// Create Account #6
		userID6 = await createBUser(context.request);
		internetLogin6 = generateLogin(10);
		console.log(`Аккаунт 6 ${userID6}`);

		// Create Account #7
		userID7 = await createBUser(context.request);
		internetLogin7 = generateLogin(10);
		console.log(`Аккаунт 7 ${userID7}`); */
	});

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		mainPage = new MainPage(page);
		await loginPage.navigateToLoginPage();
	});

	test('45645645456465456', async ({ page }) => {
		await loginPage.login(String(userID1), globalData.defaultPassword);
		await page.waitForURL(mainPage.pageUrl);
	});
});
