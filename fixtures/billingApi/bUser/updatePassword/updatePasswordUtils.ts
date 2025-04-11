import { expect } from '@playwright/test';
import { getAuthToken } from '../../auth/authenticate/authUtils';

async function updatePassword(request: any, userID: number, newPassword: string) {
	const apiUrl = `https://dev-bil-api.briz.ua/buser/${userID}/password/update`;
	const token = await getAuthToken(request);
	const response = await request.put(apiUrl, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: { Password: `${newPassword}` },
	});

	const responseBody = await response.json();
	expect(responseBody, 'Пользователь не создан').toBeDefined();
	return responseBody.data;
}

export { updatePassword };
