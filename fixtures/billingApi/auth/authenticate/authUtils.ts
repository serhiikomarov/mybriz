import { billingUserCredentials } from './authUtils.data';

/**
 * Get billing auth token
 * @param request The Playwright request context.
 * @throws Error if token didn't received.
 * @returns A promise that resolves with the API response or rejects in case of an error.
 */

async function getAuthToken(request: any): Promise<string> {
	const apiUrl = 'https://dev-bil-api.briz.ua/api/authenticate';
	const response = await request.post(apiUrl, {
		data: billingUserCredentials,
	});

	const responseBody = await response.json();
	const billingAuthToken = responseBody.data?.token;

	if (!billingAuthToken) {
		throw new Error('ERROR: Token not received.');
	}

	return billingAuthToken;
}

export { getAuthToken };
