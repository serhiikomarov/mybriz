import { test, expect } from '@playwright/test';
import { LoginPage, MainPage } from '../../pages';
import { createBUser, generatePhoneNumber, addPhoneNumber, createInternetAccount, getInternetAccountID } from '../../fixtures';
import { testData, errorMessages, globalData } from '../../testData';
import { generateLogin } from '../../fixtures';
import { TwoFactorPage } from '../../pages/authTwoFactor.page';

test.describe('Authorization by login with phone number', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	let twoFactorPage: TwoFactorPage;
	let userID: number;
	let internetAccountID: number;
	let internetLogin: string;
	let phoneNumber: string;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();

		// Create user and get contract ID
		userID = await createBUser(context.request);

		// Generate Internet login
		internetLogin = generateLogin(10);

		// Add Internet Account ot user
		internetAccountID = await getInternetAccountID(context.request, userID, internetLogin);

		// Generate phone number
		phoneNumber = generatePhoneNumber();

		// Add phone number to user
		await addPhoneNumber(context.request, userID, phoneNumber);
	});

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		mainPage = new MainPage(page);
		twoFactorPage = new TwoFactorPage(page);
		await loginPage.navigateToLoginPage();
	});

	test('Authorization by login with phone number and correct data', async ({ page }) => {
		await loginPage.login(internetLogin, globalData.defaultInternetPassword);
		await page.waitForURL(twoFactorPage.pageUrl);
		await page.waitForTimeout(3000);
		console.log(userID, internetAccountID, phoneNumber);
	});
});
