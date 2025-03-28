import { test, expect } from '@playwright/test';
import { LoginPage, MainPage, AuthTwoFactorPage } from '../../pages';
import { createBUser, generatePhoneNumber, addPhoneNumber, getInternetAccountID, generateLogin, changeLanguage, waitForSMSCode, formatPhoneNumber } from '../../fixtures';
import { setLanguage, errorMessages, globalData } from '../../testData';

test.describe('Authorization by login without phone number', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	let authTwoFactorPage: AuthTwoFactorPage;
	let userID: number;
	let userID2: number;
	let userID3: number;
	let internetLogin: string;
	let internetLogin2: string;
	let internetLogin3: string;
	let phoneNumber: string;
	let phoneNumber2: string;
	let codeFromSMS: string;
	let formatedPhoneNumber: string;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();

		// --- Сreating the first user with a phone number ---
		userID = await createBUser(context.request);
		internetLogin = generateLogin(10);
		await getInternetAccountID(context.request, userID, internetLogin);
		phoneNumber = generatePhoneNumber();
		await addPhoneNumber(context.request, userID, phoneNumber);

		// --- Creating a second user without a phone number ---
		userID2 = await createBUser(context.request);
		internetLogin2 = generateLogin(10);
		await getInternetAccountID(context.request, userID2, internetLogin2);
		phoneNumber2 = generatePhoneNumber();

		// --- Creating a third user without a phone number ---
		userID3 = await createBUser(context.request);
		internetLogin3 = generateLogin(10);
		await getInternetAccountID(context.request, userID3, internetLogin3);
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
		// Checking the entered phone number is displaying
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
		//Checking the error in the phone number input in Ukrainian localization
		await authTwoFactorPage.sendCodeButton.click();
		expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.ua.fieldRequired);
		//Checking the error in the phone number input in English localization
		await changeLanguage(page, setLanguage.en);
		await authTwoFactorPage.sendCodeButton.click();
		expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.en.fieldRequired);
	});

	test('Authorization by login with phone number from another account', async ({ page, request }) => {
		await loginPage.login(internetLogin3, globalData.defaultInternetPassword);
		await page.waitForURL(authTwoFactorPage.pageUrl);
		//Checking the error in the phone number input in Ukrainian localization
		await authTwoFactorPage.phoneNumberInput.fill(phoneNumber);
		await authTwoFactorPage.sendCodeButton.click();
		expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.ua.usedPhoneNumber);
		//Checking the error in the phone number input in English localization
		await changeLanguage(page, setLanguage.en);
		await authTwoFactorPage.phoneNumberInput.fill(phoneNumber);
		await authTwoFactorPage.sendCodeButton.click();
		await expect(authTwoFactorPage.inputHelper).toHaveText(errorMessages.en.usedPhoneNumber);
	});

	//проверить отображение номера телефона с +38 после ввода в инпут (префикс и номер телефона)

	/*
	incorrect login and password
	success change phone number flow
	invalid phone number
	empty code field
	incorrect code
	*/
});
