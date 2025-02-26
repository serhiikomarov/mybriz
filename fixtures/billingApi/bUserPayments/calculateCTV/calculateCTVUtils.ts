import { expect } from '@playwright/test';
import { getAuthToken } from '../../auth/authenticate/authUtils';

async function calculateCTVAccount(request: any, userID: number, ctvAccountID: number) {
	const apiUrl = `https://dev-bil-api.briz.ua/buser/${userID}/payments/calculate/ctv/${ctvAccountID}`;
	const token = await getAuthToken(request);
	console.log(token);
	const response = await request.post(apiUrl, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	const responseBody = await response.json();
	expect(responseBody, 'ERROR: CTV account not calculated').toBeDefined();
	return responseBody;
}

export async function getCalculateCTVfts(request: any, userID: number, ctvAccountID: number) {
	const responseBody = await calculateCTVAccount(request, userID, ctvAccountID);
	const fts = responseBody.data.view.ctv[ctvAccountID]?.fts;
	return fts;
}

export { calculateCTVAccount };
