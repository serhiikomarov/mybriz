import { expect } from '@playwright/test';
import { getAuthToken } from '../../auth/authenticate/authUtils';

async function calculateIPTVAccount(request: any, userID: number, IPTVAccountID: number) {
	const apiUrl = `https://dev-bil-api.briz.ua/buser/${userID}/payments/calculate/iptv/${IPTVAccountID}`;
	const token = await getAuthToken(request);
	const response = await request.post(apiUrl, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	const responseBody = await response.json();
	expect(responseBody, 'ERROR: IPTV account not calculated').toBeDefined();
	return responseBody;
}

async function getCalculateIPTVfts(request: any, userID: number, IPTVAccountID: number) {
	const responseBody = await calculateIPTVAccount(request, userID, IPTVAccountID);
	const fts = responseBody.data.view.iptv[IPTVAccountID]?.fts;
	return fts;
}

export { calculateIPTVAccount, getCalculateIPTVfts };
