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
	let internetLogin1: string;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();

		// Create Account #1 - Administrator
		userID1 = await createBUser(context.request);
		internetLogin1 = generateLogin(10);
		console.log(userID1);
		const responseBody = await createInternetAccount(context.request, userID1, internetLogin1);
		let accountID = responseBody.data;
		return accountID;
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
