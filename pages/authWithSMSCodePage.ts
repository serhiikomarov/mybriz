import { Page, Locator } from '@playwright/test';

class AuthWithSMSCodePage {
	private readonly page: Page;
	public readonly pageUrl: string;
	public readonly codeInputFirstDigit: Locator;
	public readonly codeInputSecondDigit: Locator;
	public readonly codeInputThirdDigit: Locator;
	public readonly codeInputFourthDigit: Locator;
	public readonly inputHelper: Locator;
	public readonly backButton: Locator;
	public readonly logInButton: Locator;
	public readonly sendCodeAgainButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageUrl = 'https://devcabinet.briz.ua/login/enter-sms-code';
		this.codeInputFirstDigit = page.locator('form > div:first-of-type > div:nth-of-type(1) > input');
		this.codeInputSecondDigit = page.locator('form > div:first-of-type > div:nth-of-type(2) > input');
		this.codeInputThirdDigit = page.locator('form > div:first-of-type > div:nth-of-type(3) > input');
		this.codeInputFourthDigit = page.locator('form > div:first-of-type > div:nth-of-type(4) > input');
		this.inputHelper = page.locator('.login-enter-code-sms-container__form__error');
		this.backButton = page.locator('.button__basic__secondary_bold');
		this.logInButton = page.locator('button.MuiButtonBase-root:nth-child(2)');
		this.sendCodeAgainButton = page.locator('button.button:nth-child(3)');
	}

	async login(code: string): Promise<void> {
		await this.codeInputFirstDigit.fill(code);
		await this.logInButton.click();
	}

	async navigateToAuthWithSMSCodePage(): Promise<void> {
		await this.page.goto(this.pageUrl);
	}

	async enterCodeFromSMS(codeFromSMS: string) {
		await this.codeInputFirstDigit.fill(Array.from(codeFromSMS)[0]);
		await this.codeInputSecondDigit.fill(Array.from(codeFromSMS)[1]);
		await this.codeInputThirdDigit.fill(Array.from(codeFromSMS)[2]);
		await this.codeInputFourthDigit.fill(Array.from(codeFromSMS)[3]);
	}
}

export { AuthWithSMSCodePage };
