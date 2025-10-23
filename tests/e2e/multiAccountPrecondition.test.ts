import { test } from '@playwright/test';
import { LoginPage, MainPage } from '../../pages';
import { createBUser, createInternetAccount, generateLogin, bUserConstructor, getInternetAccountID, generatePhoneNumber, addPhoneNumber, generateRandomEmail, addEmail, emailConfirmationCode, confirmEmail, addMoney } from '../../fixtures';
import { globalData } from '../../testData';

test.describe('Multi-account precondition', () => {
	let loginPage: LoginPage;
	let mainPage: MainPage;
	let userID1: number;
	let userID2: number;
	let userID3: number;
	let userID4: number;
	let userID5: number;
	let userID6: number;
	let userID7: number;
	let internetLogin1: string;
	let internetLogin2: string;
	let internetLogin3: string;
	let internetLogin4: string;
	let internetLogin5: string;
	let internetLogin6: string;
	let internetLogin7: string;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();

		// Create Account #1 - Администратор
		userID1 = await createBUser(context.request, await bUserConstructor('1 аккаунт - Администратор', '1'));
		internetLogin1 = generateLogin(10);
		await createInternetAccount(context.request, userID1, internetLogin1);
		console.log('\x1b[33m%s\x1b[0m', `Аккаунт 1 http://dbilling.briz.ua/Ru/billing/user/view.html?uid=${userID1}`);

		// Create Account #2
		userID2 = await createBUser(context.request, await bUserConstructor('2 аккаунт', '1'));
		internetLogin2 = generateLogin(10);
		const email2 = generateRandomEmail();
		await addEmail(context.request, userID2, email2);
		const confirmationCode = await emailConfirmationCode(context.request, email2);
		await confirmEmail(context.request, confirmationCode);
		internetLogin2 = generateLogin(10);
		await createInternetAccount(context.request, userID2, internetLogin2);
		await addMoney(context.request, userID2, { amount: 400 });
		console.log('\x1b[33m%s\x1b[0m', `Аккаунт 2 http://dbilling.briz.ua/Ru/billing/user/view.html?uid=${userID2}, ОПЛАТИТЬ УСЛУГУ`);

		// Create Account #3
		userID3 = await createBUser(context.request, await bUserConstructor('3 аккаунт', '6'));
		internetLogin3 = generateLogin(10);
		await getInternetAccountID(context.request, userID3, internetLogin3);
		const phoneNumber3 = generatePhoneNumber();
		await addPhoneNumber(context.request, userID3, phoneNumber3);
		await addMoney(context.request, userID3, { amount: 400 });
		console.log('\x1b[33m%s\x1b[0m', `Аккаунт 3 http://dbilling.briz.ua/Ru/billing/user/view.html?uid=${userID3}`);

		// Create Account #4
		userID4 = await createBUser(context.request, await bUserConstructor('4 аккаунт', '1'));
		internetLogin4 = generateLogin(10);
		const email4 = generateRandomEmail();
		await addEmail(context.request, userID4, email4);
		const confirmationCode4 = await emailConfirmationCode(context.request, email4);
		await confirmEmail(context.request, confirmationCode4);
		internetLogin4 = generateLogin(10);
		await createInternetAccount(context.request, userID4, internetLogin4);
		await addMoney(context.request, userID4, { amount: 400 });
		console.log('\x1b[33m%s\x1b[0m', `Аккаунт 4 http://dbilling.briz.ua/Ru/billing/user/view.html?uid=${userID4}`);

		// Create Account #5
		userID5 = await createBUser(context.request, await bUserConstructor('5 аккаунт', '2'));
		internetLogin5 = generateLogin(10);
		const email5 = generateRandomEmail();
		await addEmail(context.request, userID5, email5);
		const confirmationCode5 = await emailConfirmationCode(context.request, email5);
		await confirmEmail(context.request, confirmationCode5);
		internetLogin5 = generateLogin(10);
		await createInternetAccount(context.request, userID5, internetLogin5);
		await addMoney(context.request, userID5, { amount: 400 });
		console.log('\x1b[33m%s\x1b[0m', `Аккаунт 5 http://dbilling.briz.ua/Ru/billing/user/view.html?uid=${userID5}`);

		// Create Account #6
		userID6 = await createBUser(context.request, await bUserConstructor('6 аккаунт', '1'));
		internetLogin6 = generateLogin(10);
		const email6 = generateRandomEmail();
		await addEmail(context.request, userID6, email6);
		const confirmationCode6 = await emailConfirmationCode(context.request, email6);
		await confirmEmail(context.request, confirmationCode6);
		internetLogin6 = generateLogin(10);
		await createInternetAccount(context.request, userID6, internetLogin6);
		await addMoney(context.request, userID6, { amount: 400 });
		console.log('\x1b[33m%s\x1b[0m', `Аккаунт 6 http://dbilling.briz.ua/Ru/billing/user/view.html?uid=${userID6}, ДОБАВИТЬ В ДРУГОЙ МУЛЬТИАККАУНТ`);

		// Create Account #7
		userID7 = await createBUser(context.request, await bUserConstructor('7 аккаунт', '1'));
		console.log('\x1b[33m%s\x1b[0m', `Аккаунт 7 http://dbilling.briz.ua/Ru/billing/user/view.html?uid=${userID7}`);
	});

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		mainPage = new MainPage(page);
		await loginPage.navigateToLoginPage();
	});

	test('Multi-account precondition test', async ({ page }) => {
		await loginPage.login(String(userID1), globalData.defaultPassword);
		await page.waitForURL(mainPage.pageUrl);
	});
});
