import { test, expect } from '@playwright/test';
import { LoginPage, MainPage } from '../../pages';
import { createBUser, generatePhoneNumber, addPhoneNumber } from '../../fixtures';
import { errorMessages, globalData } from '../../testData';

test.describe('Authorization by phone number and password', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	let userID: number;
	let phoneNumber: string;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();

		// Create user and get contract ID
		userID = await createBUser(context.request);

		// Generate phone number
		phoneNumber = generatePhoneNumber();

		// Add phone number to user
		await addPhoneNumber(context.request, userID, phoneNumber);
	});

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		mainPage = new MainPage(page);
		await loginPage.navigateToLoginPage();
	});

	test('Authorization by phone number and password use correct data', async ({ page }) => {
		await loginPage.login(phoneNumber, globalData.defaultPassword);
		await page.waitForURL(mainPage.pageUrl);
	});

	test('Authorization by phone number not in database UA', async ({ page }) => {
		await loginPage.login(globalData.phoneNumberNotInDatabase, globalData.defaultPassword);
		await expect(loginPage.usernameInputHelper).toContainText(errorMessages.ua.undefinedUser);
	});

	test('Authorization by phone number starts with 8', async ({ page }) => {
		await loginPage.login(`8${phoneNumber}`, globalData.defaultPassword);
		await expect(loginPage.usernameInputHelper).toContainText(errorMessages.ua.undefinedUser);
	});

	test('Authorization by phone number starts with 38', async ({ page }) => {
		await loginPage.login(`38${phoneNumber}`, globalData.defaultPassword);
		await expect(loginPage.usernameInputHelper).toContainText(errorMessages.ua.undefinedUser);
	});

	test('Authorization by phone number starts with +38', async ({ page }) => {
		await loginPage.login(`+38${phoneNumber}`, globalData.defaultPassword);
		await expect(loginPage.usernameInputHelper).toContainText(errorMessages.ua.invalidValue);
	});
});
