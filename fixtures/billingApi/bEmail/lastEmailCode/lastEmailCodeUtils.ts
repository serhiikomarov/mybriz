import { getAuthToken } from '../../auth/authenticate/authUtils';

/**
 * Get Email confirmation code
 * @param request The Playwright request context.
 * @param email User's Email.
 * @throw Error if confirmation code didn't received.
 * @returns Email confirmation code.
 */

async function emailConfirmationCode(request: any, email: string) {
	const apiUrl = 'https://dev-bil-api.briz.ua/email/lastcode';
	const token = await getAuthToken(request);
	const response = await request.get(apiUrl, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: {
			email: email,
		},
	});

	const responseBody = await response.json();

	if (!responseBody.data) {
		throw new Error('Email confirmation code not received');
	}

	const emailConfirmationCode = responseBody.data;
	return emailConfirmationCode;
}

export { emailConfirmationCode };
