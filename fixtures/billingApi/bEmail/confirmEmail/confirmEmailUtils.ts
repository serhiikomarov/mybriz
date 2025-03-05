import { getAuthToken } from '../../auth/authenticate/authUtils';

/**
 * Confirms the user's Email address.
 * @param request The Playwright request context.
 * @param code Verifivation code from Email.
 * @throws Error if Email confirmation failed.
 * @returns A promise that resolves with the API response or rejects in case of an error.
 */

async function confirmEmail(request: any, code: string) {
	const apiUrl = 'https://dev-bil-api.briz.ua/buser/auth/confirm';
	const token = await getAuthToken(request);
	const response = await request.post(apiUrl, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: {
			code: code,
		},
	});

	const responseBody = await response.json();

	if (!responseBody.data) {
		throw new Error('ERROR: Email confirmation failed. Invalid or expired code.');
	}

	return responseBody;
}

export { confirmEmail };
