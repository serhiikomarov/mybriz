import { expect } from '@playwright/test';
import { defaultUserCreateObj } from './bUserCreate.data';
import { getAuthToken } from '../../auth/authenticate/authUtils';

async function createBUser(request: any, modifiedData?: any) {
	const apiUrl = 'https://dev-bil-api.briz.ua/buser';
	const token = await getAuthToken(request);
	const requestData = modifiedData || defaultUserCreateObj;
	const response = await request.post(apiUrl, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: requestData,
	});

	const responseBody = await response.json();
	expect(responseBody, 'ERROR: User not created').toHaveProperty('data', expect.any(Number));
	const userID = responseBody.data;
	return userID;
}

export { createBUser };
