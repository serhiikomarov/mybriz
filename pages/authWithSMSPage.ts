import { Page, Locator } from '@playwright/test';

class AuthWithSMSPage {
	private readonly page: Page;
	public readonly pageUrl: string;
	public readonly phoneNumberInput: Locator;
	public readonly inputHelper: Locator;
	public readonly backButton: Locator;
	public readonly sendSMSButton: Locator;
	public readonly haveSMSCodeButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageUrl = 'https://devcabinet.briz.ua/login/request-sms-code';
		this.phoneNumberInput = page.locator('.login-send-sms-container__form input');
		this.inputHelper = page.locator('.login-send-sms-container__form p');
		this.backButton = page.locator('.button__basic__secondary_bold');
		this.sendSMSButton = page.locator('button.MuiButtonBase-root:nth-child(2)');
		this.haveSMSCodeButton = page.locator('.button__text > span:nth-child(1)');
	}

	async sendSMS(phoneNumberContractID: string): Promise<void> {
		await this.phoneNumberInput.fill(phoneNumberContractID);
		await this.sendSMSButton.click();
	}

	async navigateToAuthWithSMSPage(): Promise<void> {
		await this.page.goto(this.pageUrl);
	}
}

export { AuthWithSMSPage };
