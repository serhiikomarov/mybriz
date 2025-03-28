import { Page, Locator, expect } from '@playwright/test';

class AuthTwoFactorPage {
	private readonly page: Page;
	public readonly pageUrl: string;
	public readonly backButton: Locator;
	public readonly picture: Locator;
	public readonly title: Locator;
	public readonly discription: Locator;
	public readonly phoneNumberInput: Locator;
	public readonly phoneNumberPrefix: Locator;
	public readonly phoneNumberInputPhoneNumber: Locator;
	public readonly inputHelper: Locator;
	public readonly phoneFormText: Locator;
	public readonly maskedPhoneNumber: Locator;
	public readonly changePhoneNumberButton: Locator;
	public readonly socialsText: Locator;
	public readonly sendCodeButton: Locator;
	public readonly sendCodeButtonText: Locator;
	public readonly codeInputFirstDigit: Locator;
	public readonly codeInputSecondDigit: Locator;
	public readonly codeInputThirdDigit: Locator;
	public readonly codeInputFourthDigit: Locator;
	public readonly codeInputHelper: Locator;
	public readonly logInButton: Locator;
	public readonly appleIDAuthButton: Locator;
	public readonly googleAuthButton: Locator;
	public readonly facebookAuthButton: Locator;

	public readonly texts = {
		ua: {
			backButton: 'Назад',
			title: 'Авторизація',
			phoneNumberDiscription: 'Використовуйте номер телефону як ідентифікатор. Введіть код перевірки з SMS-повідомлення.',
			codeFromSMSDiscription: 'Для входу в особистий кабінет введіть перевірочний код із SMS.',
			phoneFormText: 'Надіслати код на номер телефону:',
			changePhoneNumberButton: 'Змінити',
			sendCodeButtonText: 'Надіслати код',
			socialsText: 'або вхід через соц. мережі',
			loginButtonText: 'Увійти',
		},
		en: {
			backButton: 'Back',
			title: 'Authorization',
			phoneNumberDiscription: 'Use a phone number as an identifier. Enter the verification code from the SMS message.',
			codeFromSMSDiscription: 'To enter your personal account, enter the verification code from the SMS.',
			phoneFormText: 'Send code to phone number:',
			changePhoneNumberButton: 'Change',
			sendCodeButtonText: 'Send code',
			socialsText: 'or login with social networks',
			loginButtonText: 'Log in',
		},
	};

	constructor(page: Page) {
		this.page = page;
		this.pageUrl = 'https://devcabinet.briz.ua/login/two-factor-auth';
		this.backButton = page.locator('button.button__text__primary:nth-child(1)');
		this.picture = page.locator('.envelope-icon');
		this.title = page.locator('.bold');
		this.discription = page.locator('.two-factor-auth__content-container__content__form__description');
		this.phoneNumberInput = page.locator('.MuiInputBase-root input');
		this.phoneNumberPrefix = page.locator('.MuiTypography-root');
		this.phoneNumberInputPhoneNumber = page.locator('#mui-4');
		this.inputHelper = page.locator('#mui-4-helper-text');
		this.phoneFormText = page.locator('.two-factor-auth__content-container__content__form__phone-container__text');
		this.maskedPhoneNumber = page.locator('.two-factor-auth__content-container__content__form__phone-container__phone');
		this.changePhoneNumberButton = page.locator('button.button__text__primary:nth-child(3) > span');
		this.socialsText = page.locator('.two-factor-auth__content-container__content__socials__description');
		this.sendCodeButton = page.locator('button.MuiButtonBase-root:nth-child(3)');
		this.sendCodeButtonText = page.locator('button.MuiButtonBase-root:nth-child(3)');
		this.codeInputFirstDigit = page.locator('div:nth-child(1) > input:nth-child(1)');
		this.codeInputSecondDigit = page.locator('div:nth-child(2) > input');
		this.codeInputThirdDigit = page.locator('div:nth-child(3) > input');
		this.codeInputFourthDigit = page.locator('div:nth-child(4) > input');
		this.codeInputHelper = page.locator('.login-enter-code-sms-container__form__error');
		this.logInButton = page.locator('button.MuiButtonBase-root:nth-child(3)');
		this.appleIDAuthButton = page.locator('.apple-icon-container__small');
		this.googleAuthButton = page.locator('.google-icon-container__small');
		this.facebookAuthButton = page.locator('.facebook-icon-container__small');
	}

	async navigateToTwoFactorPage(): Promise<void> {
		await this.page.goto(this.pageUrl);
	}

	// async enterCodeFromSMS(codeFromSMS: string) {
	// 	if (Array.from(codeFromSMS)[0] != undefined) {
	// 		await this.codeInputFirstDigit.fill(Array.from(codeFromSMS)[0]);
	// 	} else if (Array.from(codeFromSMS)[1] != undefined) {
	// 		await this.codeInputFirstDigit.fill(Array.from(codeFromSMS)[0]), await this.codeInputFirstDigit.fill(Array.from(codeFromSMS)[1]);
	// 	} else if (Array.from(codeFromSMS)[2] != undefined) {
	// 		await this.codeInputFirstDigit.fill(Array.from(codeFromSMS)[0]), await this.codeInputFirstDigit.fill(Array.from(codeFromSMS)[1]), await this.codeInputFirstDigit.fill(Array.from(codeFromSMS)[2]);
	// 	} else if (Array.from(codeFromSMS)[3] != undefined) {
	// 		await this.codeInputFirstDigit.fill(Array.from(codeFromSMS)[0]), await this.codeInputFirstDigit.fill(Array.from(codeFromSMS)[1]), await this.codeInputFirstDigit.fill(Array.from(codeFromSMS)[2]);
	// 		await this.codeInputFirstDigit.fill(Array.from(codeFromSMS)[3]);
	// 	}
	// }

	async enterCodeFromSMS(codeFromSMS: string) {
		const inputs = [this.codeInputFirstDigit, this.codeInputSecondDigit, this.codeInputThirdDigit, this.codeInputFourthDigit];

		for (let i = 0; i < codeFromSMS.length; i++) {
			await inputs[i].fill(codeFromSMS[i]);
		}
	}

	async checkBasicElementsLocalization(lang: 'ua' | 'en') {
		const texts = this.texts[lang];

		const elementsToCheck = [
			{ element: this.backButton, expectedText: texts.backButton },
			{ element: this.picture, visible: true },
			{ element: this.title, expectedText: texts.title },
			{ element: this.socialsText, expectedText: texts.socialsText },
			{ element: this.appleIDAuthButton, visible: true },
			{ element: this.googleAuthButton, visible: true },
			{ element: this.facebookAuthButton, visible: true },
		];

		for (const { element, expectedText, visible } of elementsToCheck) {
			if (expectedText) {
				await expect(element).toHaveText(expectedText);
			}
			if (visible) {
				await expect(element).toBeVisible();
			}
		}
	}
}

export { AuthTwoFactorPage };
