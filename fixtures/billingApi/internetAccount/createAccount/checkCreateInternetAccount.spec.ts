import { test } from '@playwright/test';
import { createBUser } from '../../bUser/bUserCreate/bUserCreateUtils';
import { generateLogin } from '../../../helpers';
import { createInternetAccount, getInternetAccountID } from './createInternetAccountUtils';

test.describe('Checking create Internet account function', () => {
	let userID: number;
	let login: string;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		userID = await createBUser(context.request);
		login = generateLogin(10);
	});

	test('Checking create Internet account function', async ({ browser }) => {
		const context = await browser.newContext();
		const responseBody = await createInternetAccount(context.request, userID, login);
		console.log(userID);
		console.log(responseBody);
	});

	test('Checking get Internet account function', async ({ browser }) => {
		const context = await browser.newContext();
		const accountID = await getInternetAccountID(context.request, userID, login);
		console.log(`UserID: ${userID}, InternetAccountID: ${accountID}`);
	});
});
