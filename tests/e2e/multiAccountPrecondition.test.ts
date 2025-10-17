import { test, expect } from '@playwright/test';
import { LoginPage, MainPage, AuthTwoFactorPage } from '../../pages';
import { createBUser, generatePhoneNumber, addPhoneNumber, getInternetAccountID, generateLogin, changeLanguage, waitForSMSCode, formatPhoneNumber } from '../../fixtures';
import { setLanguage, errorMessages, globalData } from '../../testData';

test.describe('e2e multi-account precondition', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	let authTwoFactorPage: AuthTwoFactorPage;
	let userID1: number;
	let userID2: number;
	let userID3: number;
	let internetLogin1: string;
	let internetLogin2: string;
	let internetLogin3: string;
	let phoneNumber1: string;
	let phoneNumber2: string;
	let phoneNumber3: string;
	let codeFromSMS: string;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();

		// --- Сreating Account #1 (Administrator) ---
		userID1 = await createBUser(context.request);
		internetLogin1 = generateLogin(10);
		await getInternetAccountID(context.request, userID1, internetLogin1);
		phoneNumber1 = generatePhoneNumber();
		await addPhoneNumber(context.request, userID1, phoneNumber1);
		console.log(userID1);

		// // --- Creating a second user without a phone number ---
		// userID2 = await createBUser(context.request);
		// internetLogin2 = generateLogin(10);
		// await getInternetAccountID(context.request, userID2, internetLogin2);
		// phoneNumber2 = generatePhoneNumber();

		// // --- Creating a third user without a phone number ---
		// userID3 = await createBUser(context.request);
		// internetLogin3 = generateLogin(10);
		// await getInternetAccountID(context.request, userID3, internetLogin3);
		// phoneNumber3 = generatePhoneNumber();

		test.beforeEach(async ({ page }) => {
			loginPage = new LoginPage(page);
			mainPage = new MainPage(page);
			authTwoFactorPage = new AuthTwoFactorPage(page);
			await loginPage.navigateToLoginPage();
		});

		test('Authorization by login without phone number and correct data', async ({ page, request }) => {
			await page.waitForURL(authTwoFactorPage.pageUrl);
			// Checking 2FA (phone number page) texts and elements in Ukrainian localization
			await authTwoFactorPage.checkBasicElementsLocalization('ua');
		});
	});
});
