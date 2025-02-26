import { test } from '@playwright/test';
import { createBUser } from '../../bUser/bUserCreate/bUserCreateUtils';
import { getCTVAccountID } from '../../CTVAccount/createCTVAccountUtils';
import { getCalculateCTVfts } from './calculateCTVUtils';

test.describe('Checking getCalculateCTVfts function', () => {
	let userID: number;
	let ctvAccountID: number;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		userID = await createBUser(context.request);
		ctvAccountID = await getCTVAccountID(context.request, userID);
		console.log(ctvAccountID);
	});

	test('Checking getCalculateCTVfts function', async ({ browser }) => {
		const context = await browser.newContext();
		const fts = await getCalculateCTVfts(context.request, userID, ctvAccountID);
		console.log(fts);
	});
});
