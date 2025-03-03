import { test } from '@playwright/test';
import { createBUser } from '../../bUser/bUserCreate/bUserCreateUtils';
import { getIPTVAccountID } from '../../IPTVAccount';
import { getCalculateIPTVfts } from './calculateIPTVUtils';

test.describe('Checking getCalculateIPTVfts function', () => {
	let userID: number;
	let IPTVAccountID: number;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		userID = await createBUser(context.request);
		IPTVAccountID = await getIPTVAccountID(context.request, userID);
	});

	test('Checking getCalculateIPTVfts function', async ({ browser }) => {
		const context = await browser.newContext();
		const fts = await getCalculateIPTVfts(context.request, userID, IPTVAccountID);
		console.log(fts);
	});
});
