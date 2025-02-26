import { expect } from '@playwright/test';
import { getAuthToken } from '../../auth/authenticate/authUtils';

async function addEmail(request: any, userID: number, email: string) {
	const apiUrl = `https://dev-bil-api.briz.ua/buser/${userID}/email/add`;
	const token = await getAuthToken(request);
	console.log(token);
	const response = await request.post(apiUrl, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: {
			Email: email,
			Callback: 'callback',
		},
	});

	const responseBody = await response.json();
	expect(responseBody.data, 'ERROR: Email not added').toBe(true);
	return responseBody;
}

export { addEmail };
