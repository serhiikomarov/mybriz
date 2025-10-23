import { test, expect } from '@playwright/test';
import { createBUser } from './bUserCreateUtils';

test('Checking user creation function in billing', async ({ request }) => {
	const responseBody = await createBUser(request);
	expect(typeof responseBody, 'ERROR: User not created').toBe('number');
	console.log(`User ${responseBody} has been created.`);
});
