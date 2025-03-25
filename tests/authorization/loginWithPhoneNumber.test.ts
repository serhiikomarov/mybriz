import { test, expect } from '@playwright/test';
import { LoginPage, MainPage, AuthTwoFactorPage } from '../../pages';
import { createBUser, generatePhoneNumber, addPhoneNumber, createInternetAccount, getInternetAccountID, generateLogin, changeLanguage, getPhoneMask, waitForSMSCode } from '../../fixtures';
import { setLanguage, errorMessages, globalData } from '../../testData';

test.describe('Authorization by login with phone number', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	let authTwoFactorPage: AuthTwoFactorPage;
	let userID: number;
	let internetAccountID: number;
	let internetLogin: string;
	let phoneNumber: string;
	let codeFromSMS: string;

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
		authTwoFactorPage = new AuthTwoFactorPage(page);
		await loginPage.navigateToLoginPage();
	});

	test('Authorization by login with phone number and correct data', async ({ page, request }) => {
		await loginPage.login(internetLogin, globalData.defaultInternetPassword);
		await page.waitForURL(authTwoFactorPage.pageUrl);
		// Checking 2FA (phone number page) texts and elements in Ukrainian localization
		await expect(authTwoFactorPage.backButton).toHaveText(authTwoFactorPage.texts.ua.backButton);
		await expect(authTwoFactorPage.title).toHaveText(authTwoFactorPage.texts.ua.title);
		await expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.ua.phoneNumberDiscription);
		await expect(authTwoFactorPage.phoneFormText).toHaveText(authTwoFactorPage.texts.ua.phoneFormText);
		const phoneMask = getPhoneMask(phoneNumber);
		await expect(authTwoFactorPage.maskedPhoneNumber).toHaveText(phoneMask);
		await expect(authTwoFactorPage.changePhoneNumberButton).toHaveText(authTwoFactorPage.texts.ua.changePhoneNumberButton);
		await expect(authTwoFactorPage.sendCodeButton).toHaveText(authTwoFactorPage.texts.ua.sendCodeButtonText);
		await expect(authTwoFactorPage.socialsText).toHaveText(authTwoFactorPage.texts.ua.socialsText);
		expect(authTwoFactorPage.appleIDAuthButton).toBeVisible();
		expect(authTwoFactorPage.googleAuthButton).toBeVisible();
		expect(authTwoFactorPage.facebookAuthButton).toBeVisible();
		// Checking 2FA (phone number page) texts and elements in English localization
		await changeLanguage(page, setLanguage.en);
		await expect(authTwoFactorPage.backButton).toHaveText(authTwoFactorPage.texts.en.backButton);
		await expect(authTwoFactorPage.title).toHaveText(authTwoFactorPage.texts.en.title);
		await expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.en.phoneNumberDiscription);
		await expect(authTwoFactorPage.phoneFormText).toHaveText(authTwoFactorPage.texts.en.phoneFormText);
		await expect(authTwoFactorPage.maskedPhoneNumber).toHaveText(phoneMask);
		await expect(authTwoFactorPage.changePhoneNumberButton).toHaveText(authTwoFactorPage.texts.en.changePhoneNumberButton);
		await expect(authTwoFactorPage.sendCodeButton).toHaveText(authTwoFactorPage.texts.en.sendCodeButtonText);
		await expect(authTwoFactorPage.socialsText).toHaveText(authTwoFactorPage.texts.en.socialsText);
		expect(authTwoFactorPage.appleIDAuthButton).toBeVisible();
		expect(authTwoFactorPage.googleAuthButton).toBeVisible();
		expect(authTwoFactorPage.facebookAuthButton).toBeVisible();
		await authTwoFactorPage.sendCodeButton.click();
		// Checking 2FA (code from SMS page) texts and elements in Ukrainian localization
		await changeLanguage(page, setLanguage.ua);
		await expect(authTwoFactorPage.backButton).toHaveText(authTwoFactorPage.texts.ua.backButton);
		await expect(authTwoFactorPage.title).toHaveText(authTwoFactorPage.texts.ua.title);
		await expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.ua.codeFromSMSDiscription);
		await expect(authTwoFactorPage.logInButton).toHaveText(authTwoFactorPage.texts.ua.loginButtonText);
		await expect(authTwoFactorPage.socialsText).toHaveText(authTwoFactorPage.texts.ua.socialsText);
		expect(authTwoFactorPage.appleIDAuthButton).toBeVisible();
		expect(authTwoFactorPage.googleAuthButton).toBeVisible();
		expect(authTwoFactorPage.facebookAuthButton).toBeVisible();
		// Checking 2FA (code from SMS page) texts and elements in English localization
		await changeLanguage(page, setLanguage.en);
		await expect(authTwoFactorPage.backButton).toHaveText(authTwoFactorPage.texts.en.backButton);
		await expect(authTwoFactorPage.title).toHaveText(authTwoFactorPage.texts.en.title);
		await expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.en.codeFromSMSDiscription);
		await expect(authTwoFactorPage.logInButton).toHaveText(authTwoFactorPage.texts.en.loginButtonText);
		await expect(authTwoFactorPage.socialsText).toHaveText(authTwoFactorPage.texts.en.socialsText);
		expect(authTwoFactorPage.appleIDAuthButton).toBeVisible();
		expect(authTwoFactorPage.googleAuthButton).toBeVisible();
		expect(authTwoFactorPage.facebookAuthButton).toBeVisible();
		codeFromSMS = await waitForSMSCode(request, phoneNumber);
		await authTwoFactorPage.enterCodeFromSMS(codeFromSMS);
		await expect(authTwoFactorPage.codeInputFourthDigit).toHaveValue(Array.from(codeFromSMS)[3]);
		await authTwoFactorPage.logInButton.click();
		await page.waitForURL(mainPage.pageUrl);
	});

	// test('Authorization by login with phone number and correct data', async ({ page, request }) => {
	// 	await loginPage.login(internetLogin, globalData.defaultInternetPassword);
	// 	await page.waitForURL(authTwoFactorPage.pageUrl);
	// 	await expect(authTwoFactorPage.backButton).toHaveText(authTwoFactorPage.texts.ua.backButton);
	// 	await expect(authTwoFactorPage.title).toHaveText(authTwoFactorPage.texts.ua.title);
	// 	await expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.ua.phoneNumberDiscription);
	// 	await expect(authTwoFactorPage.phoneFormText).toHaveText(authTwoFactorPage.texts.ua.phoneFormText);
	// 	const phoneMask = getPhoneMask(phoneNumber);
	// 	await expect(authTwoFactorPage.maskedPhoneNumber).toHaveText(phoneMask);
	// 	await expect(authTwoFactorPage.changePhoneNumberButton).toHaveText(authTwoFactorPage.texts.ua.changePhoneNumberButton);
	// 	await expect(authTwoFactorPage.sendCodeButton).toHaveText(authTwoFactorPage.texts.ua.sendCodeButtonText);
	// 	await expect(authTwoFactorPage.socialsText).toHaveText(authTwoFactorPage.texts.ua.socialsText);
	// 	expect(authTwoFactorPage.appleIDAuthButton).toBeVisible();
	// 	expect(authTwoFactorPage.googleAuthButton).toBeVisible();
	// 	expect(authTwoFactorPage.facebookAuthButton).toBeVisible();
	// 	authTwoFactorPage.sendCodeButton.click();
	// 	await expect(authTwoFactorPage.backButton).toHaveText(authTwoFactorPage.texts.ua.backButton);
	// 	await expect(authTwoFactorPage.title).toHaveText(authTwoFactorPage.texts.ua.title);
	// 	await expect(authTwoFactorPage.discription).toHaveText(authTwoFactorPage.texts.ua.codeFromSMSDiscription);
	// 	await expect(authTwoFactorPage.logInButton).toHaveText(authTwoFactorPage.texts.ua.loginButtonText);
	// 	await expect(authTwoFactorPage.socialsText).toHaveText(authTwoFactorPage.texts.ua.socialsText);
	// 	expect(authTwoFactorPage.appleIDAuthButton).toBeVisible();
	// 	expect(authTwoFactorPage.googleAuthButton).toBeVisible();
	// 	expect(authTwoFactorPage.facebookAuthButton).toBeVisible();
	// 	codeFromSMS = await waitForSMSCode(request, phoneNumber);
	// 	await authTwoFactorPage.enterCodeFromSMS(codeFromSMS);
	// 	await expect(authTwoFactorPage.codeInputFourthDigit).toHaveValue(Array.from(codeFromSMS)[3]);
	// 	authTwoFactorPage.logInButton.click();
	// 	await page.waitForURL(mainPage.pageUrl);
	// });

	/*
	incorrect login and password
	empty phone number field
	phone number from another account
	invalid phone number
	empty code field
	incorrect code
	*/
});
