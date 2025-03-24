const globalData = {
	defaultPassword: '123456',
	defaultInternetPassword: '123123',
	alternativePassword: 'alt9876543210',
	invalid5DigitsPassword: '12345',
	invalid17DigitsPassword: '98765432101234567',
	invalid3digitContractID: '111',
	emailWithoutAt: 'testmail.com',
	emailIncorrectDomen: 'testmail@gmail',
	emailNotInDatabase: 'emailnotindatabase@breezein.test',
	maxLengthPassword: 'Lenght9876543210',
	wrongValidPassword: 'asasd45a64564',
	emptyString: '',
	xssInjection: "<script>alert('XSS')</script>",
	phoneNumberNotInDatabase: '0109999888',
	invalidPhoneNumber: '8007654321',
	contractIDNotInDatabase: '999999',
};

export { globalData };
