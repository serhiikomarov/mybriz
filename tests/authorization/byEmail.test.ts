import { test, expect } from '@playwright/test';
import { LoginPage, MainPage } from '../../pages';
import { globalData, createBUser, addEmail, emailConfirmationCode, confirmEmail, generateRandomEmail } from '../../fixtures';
import { testData, errorMessages } from '../../testData';

test.describe('Authorization by email and password', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	let userID: number;
	let email: string;
	let code: string;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();

		// Create user and get contract ID
		userID = await createBUser(context.request);

		// Generate email
		email = generateRandomEmail();

		// Add email to user
		await addEmail(context.request, userID, email);

		// Get confirmation code
		code = await emailConfirmationCode(context.request, email);

		// Confirm email
		await confirmEmail(context.request, code);
	});

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		mainPage = new MainPage(page);
		await loginPage.navigateToLoginPage();
	});

	test('Authorization by email and password use correct data', async ({ page }) => {
		await loginPage.login(email, globalData.defaultPassword);
		await page.waitForURL(mainPage.pageUrl);
	});

	test('Authorization by email and empty password UA', async () => {
		await loginPage.login(email, globalData.emptyString);
		await expect(loginPage.passwordInputHelper).toContainText(errorMessages.ua.fieldRequired);
	});

	test('Authorization by email and empty password EN', async ({ page }) => {
		await page.goto(`${loginPage.pageUrl}${testData.languageEN}`);
		await loginPage.login(email, globalData.emptyString);
		await expect(loginPage.passwordInputHelper).toContainText(errorMessages.en.fieldRequired);
	});

	test('Authorization by email without at sign UA', async () => {
		await loginPage.login(globalData.emailWithoutAt, globalData.defaultPassword);
		await expect(loginPage.usernameInputHelper).toContainText(errorMessages.ua.invalidValue);
	});

	test('Authorization by email with incorrect domen EN', async ({ page }) => {
		await page.goto(`${loginPage.pageUrl}${testData.languageEN}`);
		await loginPage.login(globalData.emailIncorrectDomen, globalData.defaultPassword);
		await expect(loginPage.usernameInputHelper).toContainText(errorMessages.en.invalidValue);
	});

	test('Authorization by email with email not in database UA', async () => {
		await loginPage.login(globalData.emailNotInDatabase, globalData.defaultPassword);
		await expect(loginPage.usernameInputHelper).toContainText(errorMessages.ua.undefinedUser);
	});
});
