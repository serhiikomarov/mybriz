import { getAuthToken } from '../../auth';

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

async function waitForSMSCode(request: any, phoneNumberContractID: string, timeout = 10000) {
	const start = Date.now();
	let code = null;

	while (Date.now() - start < timeout) {
		code = await checkLastCodeSMS(request, phoneNumberContractID);
		if (code) return code;
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second and try again
	}

	throw new Error('ERROR: SMS code not received within timeout');
}

export { checkLastCodeSMS, waitForSMSCode };
