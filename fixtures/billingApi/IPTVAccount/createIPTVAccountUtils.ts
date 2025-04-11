import { expect } from '@playwright/test';
import { getAuthToken } from '../auth/authenticate/authUtils';
import { defaultIPTVAccountObj } from './createIPTVAccount.data';

async function createIPTVAccount(request: any, userID: number, data?: any) {
	const apiUrl = `https://dev-bil-api.briz.ua/buser/${userID}/iptvs`;
	const token = await getAuthToken(request);
	const response = await request.post(apiUrl, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: data || defaultIPTVAccountObj,
	});

	const responseBody = await response.json();
	expect(responseBody, 'ERROR: IPTV account not added').toBeDefined();
	return responseBody;
}

async function getIPTVAccountID(request: any, userID: number) {
	const responseBody = await createIPTVAccount(request, userID);
	const accountID = responseBody.data.id;
	return accountID;
}

export { createIPTVAccount, getIPTVAccountID };
