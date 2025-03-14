import { test, expect } from '@playwright/test';
import { LoginPage, MainPage, AuthWithSMSPage, AuthWithSMSCodePage } from '../../pages';
import { createBUser, generatePhoneNumber, addPhoneNumber, waitForSMSCode } from '../../fixtures';
import { testData, errorMessages, globalData } from '../../testData';

test.describe('Authorization by SMS with contract ID', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	let authWithSMSPage: AuthWithSMSPage;
	let authWithSMSCodePage: AuthWithSMSCodePage;
	let userID: number;
	let userIDWithoutPhoneNumber: number;
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

		// Create user without phone number and get contract ID
		userIDWithoutPhoneNumber = await createBUser(context.request);
	});

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		mainPage = new MainPage(page);
		authWithSMSPage = new AuthWithSMSPage(page);
		authWithSMSCodePage = new AuthWithSMSCodePage(page);
		await loginPage.navigateToLoginPage();
		await loginPage.authWithSMSButton.click();
	});

	test('Authorization by SMS with correct contract ID and correct code from SMS', async ({ page, request }) => {
		await authWithSMSPage.sendSMS(String(userID));
		codeFromSMS = await waitForSMSCode(request, phoneNumber);
		authWithSMSCodePage.enterCodeFromSMS(codeFromSMS);
		await page.waitForTimeout(1000); // waiting until inputs will be filled
		await authWithSMSCodePage.logInButton.click();
		await page.waitForURL(mainPage.pageUrl);
	});

	test('Authorization by SMS with empty input UA', async () => {
		await authWithSMSPage.sendSMS(String(''));
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.ua.fieldRequired);
	});

	test('Authorization by SMS with empty input EN', async ({ page }) => {
		await page.goto(`${authWithSMSPage.pageUrl}${testData.languageEN}`);
		await authWithSMSPage.sendSMS(String(''));
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.en.fieldRequired);
	});

	test('Authorization by SMS with short contract ID UA', async () => {
		await authWithSMSPage.sendSMS(globalData.invalid3digitContractID);
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.ua.contractIDIsShort);
	});

	test('Authorization by SMS with short contract ID EN', async ({ page }) => {
		await page.goto(`${authWithSMSPage.pageUrl}${testData.languageEN}`);
		await authWithSMSPage.sendSMS(globalData.invalid3digitContractID);
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.en.contractIDIsShort);
	});

	test('Authorization by SMS with contract ID not in database UA', async () => {
		await authWithSMSPage.sendSMS(globalData.contractIDNotInDatabase);
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.ua.incorrectAccountNumberCode);
	});

	test('Authorization by SMS with contract ID not in database EN', async ({ page }) => {
		await page.goto(`${authWithSMSPage.pageUrl}${testData.languageEN}`);
		await authWithSMSPage.sendSMS(globalData.contractIDNotInDatabase);
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.en.incorrectAccountNumberCode);
	});

	test('Authorization by SMS with contract ID without SMS informing UA', async () => {
		await authWithSMSPage.sendSMS(String(userIDWithoutPhoneNumber));
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.ua.informingBySMSIsNotActive);
	});

	test('Authorization by SMS with contract ID without SMS informing EN', async ({ page }) => {
		await page.goto(`${authWithSMSPage.pageUrl}${testData.languageEN}`);
		await authWithSMSPage.sendSMS(String(userIDWithoutPhoneNumber));
		await expect(authWithSMSPage.inputHelper).toContainText(errorMessages.en.informingBySMSIsNotActive);
	});
});
