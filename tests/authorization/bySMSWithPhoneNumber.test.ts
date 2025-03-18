import { test, expect } from '@playwright/test';
import { LoginPage, MainPage, AuthWithSMSPage, AuthWithSMSCodePage } from '../../pages';
import { createBUser, generatePhoneNumber, addPhoneNumber, waitForSMSCode } from '../../fixtures';
import { testData, errorMessages, globalData } from '../../testData';

test.describe('Authorization by SMS with phone number', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	let authWithSMSPage: AuthWithSMSPage;
	let authWithSMSCodePage: AuthWithSMSCodePage;
	let userID: number;
	let phoneNumber: string;
	let codeFromSMS: string;

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
		authWithSMSPage = new AuthWithSMSPage(page);
		authWithSMSCodePage = new AuthWithSMSCodePage(page);
		await loginPage.navigateToLoginPage();
		await loginPage.authWithSMSButton.click();
	});

	test('Authorization by SMS with correct phone number and correct code from SMS', async ({ page, request }) => {
		await authWithSMSPage.sendSMS(phoneNumber);
		codeFromSMS = await waitForSMSCode(request, phoneNumber);
		authWithSMSCodePage.enterCodeFromSMS(codeFromSMS);
		// checking for last element of input has been filled
		await expect(authWithSMSCodePage.codeInputFourthDigit).toHaveValue(Array.from(codeFromSMS)[3]);
		await authWithSMSCodePage.logInButton.click();
		await page.waitForURL(mainPage.pageUrl);
	});

	test('Authorization by SMS with phone number not in database UA', async () => {
		await authWithSMSPage.sendSMS(globalData.phoneNumberNotInDatabase);
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.ua.incorrectAccountNumberCode);
	});

	test('Authorization by SMS with phone number not in database EN', async ({ page }) => {
		await page.goto(`${authWithSMSPage.pageUrl}${testData.languageEN}`);
		await authWithSMSPage.sendSMS(globalData.phoneNumberNotInDatabase);
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.en.incorrectAccountNumberCode);
	});

	test('Authorization by SMS with ivalid phone number UA', async () => {
		await authWithSMSPage.sendSMS(globalData.invalidPhoneNumber);
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.ua.invalidPhoneNumber);
	});

	test('Authorization by SMS with ivalid phone number EN', async ({ page }) => {
		await page.goto(`${authWithSMSPage.pageUrl}${testData.languageEN}`);
		await authWithSMSPage.sendSMS(globalData.invalidPhoneNumber);
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.en.invalidPhoneNumber);
	});

	test('Authorization by SMS checking more than 10 digits in input', async ({ page }) => {
		await authWithSMSPage.phoneNumberInput.pressSequentially('09876543210');
		const value = await authWithSMSPage.phoneNumberInput.inputValue();
		expect(value).toBe('0987654321');
	});
});
