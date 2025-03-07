import { expect } from '@playwright/test';
import { getAuthToken } from '../auth/authenticate/authUtils';

async function checkLastCodeSMS(request: any, phoneNumber: string) {
	const apiUrl = `https://dev-bil-api.briz.ua/sms/lastcode`;
	const token = await getAuthToken(request);
	const response = await request.get(apiUrl, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: {
			phone: `${phoneNumber}`,
		},
	});

	const responseBody = await response.json();
	//expect(responseBody.data, 'ERROR: SMS Code not received').toBeGreaterThan(0);
	return responseBody.data;
}

export { checkLastCodeSMS };
