import { test } from '@playwright/test';
import { getAuthToken } from './authUtils';

test('Checking the function of authorization token in billing', async ({ request }) => {
	const token = await getAuthToken(request);
});
