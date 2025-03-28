const errorMessages = {
	ua: {
		fieldRequired: `Це обов'язкове поле`,
		minChar3: 'Кількість символів - 3',
		minChar4: 'Кількість символів - 4',
		minChar6: 'Кількість символів - 6',
		minChar10: 'Кількість символів - 10',
		maxChar16: 'Кількість символів не більше ніж - 16',
		invalidValue: 'Невірне значення',
		undefinedUser: 'Користувача з таким логіном і паролем не знайдено.',
		incorrectAccountNumberCode: '№ договору або Код з SMS некоректний. Перевірте і спробуйте знову.',
		informingBySMSIsNotActive: 'Послуга SMS-інформування не активна для даного договору.',
		invalidConfirmationCode: 'Введено неправильний код підтвердження.',
		invalidPhoneNumber: 'Поле має бути коректним телефоном чи номером договору.',

		usedPhoneNumber: 'Цей СМС-номер вже використовується.',
		incorrectFormatPhoneNumber: 'Поле номер телефону має невірний формат',
		wrongCode: 'Неправильний код.',
	},
	en: {
		fieldRequired: 'This field is required',
		minChar3: 'Number of characters at least - 3',
		minChar4: 'Number of characters at least - 4',
		minChar6: 'Number of characters at least - 6',
		minChar10: 'Number of characters at least - 10',
		maxChar16: 'The number of characters must be no more than - 16',
		invalidValue: 'Invalid value',
		undefinedUser: 'User with this login and password not found.',
		incorrectAccountNumberCode: 'Invalid Contract number or SMS-code. Check and try again.',
		informingBySMSIsNotActive: 'The SMS-informing service is not active for this agreement.',
		invalidConfirmationCode: 'Invalid confirmation code.',
		invalidPhoneNumber: 'The attribute must be a valid phone number or contract number.',
		usedPhoneNumber: 'This SMS number is already used.',
		incorrectFormatPhoneNumber: 'The phone number is in wrong format',
		wrongCode: 'Invalid code.',
	},
};

export { errorMessages };
