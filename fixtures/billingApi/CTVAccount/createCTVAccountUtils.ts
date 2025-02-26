import { expect } from '@playwright/test';
import { getAuthToken } from '../auth/authenticate/authUtils';
import { defaultCTVAccountObj } from './createCTVAccount.data';

async function createCTVAccount(request: any, userID: number, data?: any) {
	const apiUrl = `https://dev-bil-api.briz.ua/buser/${userID}/ctvs`;
	const token = await getAuthToken(request);
	console.log(token);
	const response = await request.post(apiUrl, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: data || defaultCTVAccountObj,
	});

	const responseBody = await response.json();
	expect(responseBody, 'ERROR: CTV account not added').toBeDefined();
	return responseBody;
}

async function getCTVAccountID(request: any, userID: number) {
	const responseBody = await createCTVAccount(request, userID);
	const accountID = responseBody.data.id;
	return accountID;
}

export { createCTVAccount, getCTVAccountID };
