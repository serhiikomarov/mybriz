import { test, expect } from '@playwright/test';
import { LoginPage, MainPage, AuthTwoFactorPage } from '../../pages';
import { createBUser, generatePhoneNumber, addPhoneNumber, getInternetAccountID, generateLogin, changeLanguage, waitForSMSCode, formatPhoneNumber } from '../../fixtures';
import { setLanguage, errorMessages, globalData } from '../../testData';

test.describe('Authorization by login without phone number', () => {
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

		// --- Сreating the first user with a phone number ---
		userID1 = await createBUser(context.request);
		internetLogin1 = generateLogin(10);
		await getInternetAccountID(context.request, userID1, internetLogin1);
		phoneNumber1 = generatePhoneNumber();
		await addPhoneNumber(context.request, userID1, phoneNumber1);

		// --- Creating a second user without a phone number ---
		userID2 = await createBUser(context.request);
		internetLogin2 = generateLogin(10);
		await getInternetAccountID(context.request, userID2, internetLogin2);
		phoneNumber2 = generatePhoneNumber();

		// --- Creating a third user without a phone number ---
		userID3 = await createBUser(context.request);
		internetLogin3 = generateLogin(10);
		await getInternetAccountID(context.request, userID3, internetLogin3);
		phoneNumber3 = generatePhoneNumber();
	});

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		mainPage = new MainPage(page);
		authTwoFactorPage = new AuthTwoFactorPage(page);
		await loginPage.navigateToLoginPage();
	});

	test('Authorization by login without phone number and correct data', async ({ page, request }) => {
		await loginPage.login(internetLogin2, globalData.defaultInternetPassword);
		await page.waitForURL(authTwoFactorPage.pageUrl);
		// Checking 2FA (phone number page) texts and elements in Ukrainian localization
		await authTwoFactorPage.checkBasicElementsLocalization('ua');
		expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.ua.phoneNumberDiscription);
		expect(authTwoFactorPage.sendCodeButton).toHaveText(authTwoFactorPage.texts.ua.sendCodeButtonText);
		// Checking 2FA (phone number page) texts and elements in English localization
		await changeLanguage(page, setLanguage.en);
		await authTwoFactorPage.checkBasicElementsLocalization('en');
		expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.en.phoneNumberDiscription);
		expect(authTwoFactorPage.sendCodeButton).toHaveText(authTwoFactorPage.texts.en.sendCodeButtonText);
		await authTwoFactorPage.phoneNumberInput.fill(phoneNumber2);
		// Checking the entered phone number is displaying correctly
		expect(authTwoFactorPage.phoneNumberPrefix).toHaveText(globalData.phoneNumberPrefix);
		expect(authTwoFactorPage.phoneNumberInputPhoneNumber).toHaveAttribute('value', formatPhoneNumber(phoneNumber2));
		await authTwoFactorPage.sendCodeButton.click();
		// Checking 2FA (code from SMS page) texts and elements in Ukrainian localization
		await changeLanguage(page, setLanguage.ua);
		await authTwoFactorPage.checkBasicElementsLocalization('ua');
		await expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.ua.codeFromSMSDiscription);
		expect(authTwoFactorPage.logInButton).toHaveText(authTwoFactorPage.texts.ua.loginButtonText);
		// Checking 2FA (code from SMS page) texts and elements in English localization
		await changeLanguage(page, setLanguage.en);
		await authTwoFactorPage.checkBasicElementsLocalization('en');
		expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.en.codeFromSMSDiscription);
		expect(authTwoFactorPage.logInButton).toHaveText(authTwoFactorPage.texts.en.loginButtonText);
		codeFromSMS = await waitForSMSCode(request, phoneNumber2);
		await authTwoFactorPage.enterCodeFromSMS(codeFromSMS);
		expect(authTwoFactorPage.codeInputFourthDigit).toHaveValue(Array.from(codeFromSMS)[3]);
		await authTwoFactorPage.logInButton.click();
		await page.waitForURL(mainPage.pageUrl);
	});

	test('Authorization by login with empty phone number input', async ({ page, request }) => {
		await loginPage.login(internetLogin3, globalData.defaultInternetPassword);
		await page.waitForURL(authTwoFactorPage.pageUrl);
		// Checking the error in the phone number input in Ukrainian localization
		await authTwoFactorPage.sendCodeButton.click();
		await expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.ua.fieldRequired);
		// Checking the error in the phone number input in English localization
		await changeLanguage(page, setLanguage.en);
		await authTwoFactorPage.sendCodeButton.click();
		await expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.en.fieldRequired);
	});

	test('Authorization by login with invalid short phone number', async ({ page, request }) => {
		await loginPage.login(internetLogin3, globalData.defaultInternetPassword);
		await page.waitForURL(authTwoFactorPage.pageUrl);
		// Checking the error in the phone number input in Ukrainian localization
		await authTwoFactorPage.phoneNumberInput.fill(globalData.invalidShortPhoneNumber);
		await authTwoFactorPage.sendCodeButton.click();
		await expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.ua.invalidShortPhoneNumber);
		// Checking the error in the phone number input in English localization
		await changeLanguage(page, setLanguage.en);
		await authTwoFactorPage.phoneNumberInput.fill(globalData.invalidShortPhoneNumber);
		await authTwoFactorPage.sendCodeButton.click();
		await expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.en.invalidShortPhoneNumber);
	});

	test('Authorization by login with incorrect format phone number', async ({ page, request }) => {
		await loginPage.login(internetLogin3, globalData.defaultInternetPassword);
		await page.waitForURL(authTwoFactorPage.pageUrl);
		// Checking the error in the phone number input in Ukrainian localization
		await authTwoFactorPage.phoneNumberInput.fill(globalData.incorrectFormatPhoneNumber);
		await authTwoFactorPage.sendCodeButton.click();
		await expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.ua.incorrectFormatPhoneNumber);
		// Checking the error in the phone number input in English localization
		await changeLanguage(page, setLanguage.en);
		await authTwoFactorPage.phoneNumberInput.fill(globalData.incorrectFormatPhoneNumber);
		await authTwoFactorPage.sendCodeButton.click();
		await expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.en.incorrectFormatPhoneNumber);
	});

	test('Authorization by login with phone number from another account', async ({ page, request }) => {
		await loginPage.login(internetLogin3, globalData.defaultInternetPassword);
		await page.waitForURL(authTwoFactorPage.pageUrl);
		// Checking the error in the phone number input in Ukrainian localization
		await authTwoFactorPage.phoneNumberInput.fill(phoneNumber1);
		await authTwoFactorPage.sendCodeButton.click();
		await expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.ua.usedPhoneNumber);
		// Checking the error in the phone number input in English localization
		await changeLanguage(page, setLanguage.en);
		await authTwoFactorPage.phoneNumberInput.fill(phoneNumber1);
		await authTwoFactorPage.sendCodeButton.click();
		await expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.en.usedPhoneNumber);
	});

	test('Authorization by login write letters in the phone number input', async ({ page, request }) => {
		await loginPage.login(internetLogin3, globalData.defaultInternetPassword);
		await page.waitForURL(authTwoFactorPage.pageUrl);
		await authTwoFactorPage.phoneNumberInput.click();
		await page.keyboard.type(`${globalData.stringLettersOnly}`, { delay: 100 });
		await expect(authTwoFactorPage.phoneNumberInputPhoneNumber).toHaveAttribute('value', globalData.emptyString);
	});

	test('Authorization by login paste letters in the phone number input', async ({ page, request }) => {
		await loginPage.login(internetLogin3, globalData.defaultInternetPassword);
		await page.waitForURL(authTwoFactorPage.pageUrl);
		await authTwoFactorPage.phoneNumberInput.fill(globalData.stringLettersOnly);
		await expect(authTwoFactorPage.phoneNumberInputPhoneNumber).toHaveAttribute('value', globalData.emptyString);
	});

	test('Authorization by login with empty code from SMS field', async ({ page, request }) => {
		await loginPage.login(internetLogin3, globalData.defaultInternetPassword);
		await page.waitForURL(authTwoFactorPage.pageUrl);
		// Checking the error in the SMS code input in Ukrainian localization
		await authTwoFactorPage.phoneNumberInput.fill(phoneNumber3);
		await authTwoFactorPage.sendCodeButton.click();
		await authTwoFactorPage.logInButton.click();
		await expect(authTwoFactorPage.codeInputHelper).toHaveText(errorMessages.ua.fieldRequired);
		// Checking the error in the SMS code input in English localization
		await changeLanguage(page, setLanguage.en);
		await authTwoFactorPage.logInButton.click();
		await expect(authTwoFactorPage.codeInputHelper).toHaveText(errorMessages.en.fieldRequired);
	});

	test('Authorization by login with wrong code from SMS field', async ({ page }) => {
		await loginPage.login(internetLogin3, globalData.defaultInternetPassword);
		await page.waitForURL(authTwoFactorPage.pageUrl);
		// Checking the error in the SMS code input in Ukrainian localization
		await authTwoFactorPage.phoneNumberInput.fill(phoneNumber3);
		await authTwoFactorPage.sendCodeButton.click();
		await authTwoFactorPage.enterCodeFromSMS(globalData.wrongSMSCode);
		await authTwoFactorPage.logInButton.click();
		await expect(authTwoFactorPage.codeInputHelper).toHaveText(errorMessages.ua.wrongCode);
		// Checking the error in the SMS code input in English localization
		await changeLanguage(page, setLanguage.en);
		await authTwoFactorPage.logInButton.click();
		await expect(authTwoFactorPage.codeInputHelper).toHaveText(errorMessages.en.wrongCode);
	});

	//

	/*
	короткий код 
	ввести буквы в коде
	ввставить буквы в коде

	*/
});
