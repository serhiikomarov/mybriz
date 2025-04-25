import { Page, Locator } from '@playwright/test';

class PaymentPage {
	private readonly page: Page;
	public readonly pageUrl: string;

	//  Names of the locators for the main elements on the page
	public readonly pageTitle: Locator;
	public readonly serviceTitle: Locator;
	public readonly serviceAmount: Locator;
	public readonly internetLogin: Locator;
	public readonly moviesCheckbox: Locator;
	public readonly staticIpCheckbox: Locator;
	public readonly currentPeriod: Locator;
	public readonly nextPeriod: Locator;
	public readonly numberOfMonths: Locator;
	public readonly minusButton: Locator;
	public readonly plusButton: Locator;
	public readonly monthsInput: Locator;
	public readonly percentOfBonuses: Locator;
	public readonly preset3months: Locator;
	public readonly preset6months: Locator;
	public readonly preset12months: Locator;

	// Names of the "Checkout Summary" component
	public readonly checkoutMainField: Locator;
	public readonly checkoutMainValue: Locator;
	public readonly paymentPeriod: Locator;
	public readonly useBonusesCheckbox: Locator;
	public readonly activateButton: Locator;
	public readonly spoilerButton: Locator;
	public readonly mainServiceField: Locator;
	public readonly mainServiceValue: Locator;
	public readonly filmsField: Locator;
	public readonly filmsValue: Locator;
	public readonly dedicatedIPField: Locator;
	public readonly dedicatedIPValue: Locator;
	public readonly accruedBonusesField: Locator;
	public readonly accruedBonusesValue: Locator;
	public readonly refundField: Locator;
	public readonly refundValue: Locator;
	public readonly totalBalanceAmountField: Locator;
	public readonly totalBalanceAmountValue: Locator;
	public readonly bonusRefundField: Locator;
	public readonly bonusRefundValue: Locator;
	public readonly totalBonusesField: Locator;
	public readonly totalBonusesValue: Locator;
	public readonly cashWithdrawalField: Locator;
	public readonly cashWithdrawalValue: Locator;
	public readonly payAmountField: Locator;
	public readonly payAmountValue: Locator;
	public readonly checkoutField: Locator;
	public readonly checkoutValue: Locator;

	constructor(page: Page, accountID?: number, type?: string) {
		this.page = page;
		this.pageUrl = `https://devcabinet.briz.ua/service-payment?accountId=${accountID}&accountType=${type}`;

		// Locators of the main elements on the page
		this.pageTitle = page.locator('.payment__title');
		this.serviceTitle = page.locator('.payment__content__options__service-changer__service-name__name__value');
		this.serviceAmount = page.locator('html > body > div:first-of-type > div > div > div > main > div > div > div > div > div:first-of-type > div:first-of-type > div > div > p');
		this.internetLogin = page.locator('article.payment__content__label:nth-child(3)');
		this.moviesCheckbox = page.locator('');
		this.staticIpCheckbox = page.locator('');
		this.currentPeriod = page.locator('button.MuiButtonBase-root:nth-child(1)');
		this.nextPeriod = page.locator('');
		this.numberOfMonths = page.locator('div:nth-of-type(3) > div > div:first-of-type > span');
		this.minusButton = page.locator('.minus');
		this.plusButton = page.locator('.plus');
		this.monthsInput = page.locator('div.ui');
		this.percentOfBonuses = page.locator('.payment__content__options__number-of-month-selector__header__discount span');
		this.preset3months = page.locator('button.discount__preset:nth-child(1)');
		this.preset6months = page.locator('button.discount__preset:nth-child(2)');
		this.preset12months = page.locator('button.MuiToggleButton-root:nth-child(3)');

		// Locators of the "Checkout Summary" component
		this.checkoutMainField = page.locator('div:nth-of-type(2) > div > div:first-of-type > div > article');
		this.checkoutMainValue = page.locator('div:nth-of-type(2) > div > div:first-of-type > div > div > span');
		this.paymentPeriod = page.locator('');
		this.useBonusesCheckbox = page.locator('');
		this.activateButton = page.locator('.button__basic__primary');
		this.spoilerButton = page.locator('div:first-of-type>div>div>div>main>div>div>div>div>div:nth-of-type(2)>div>div:nth-of-type(2)>div');
		this.mainServiceField = page.locator('div.info-row:nth-child(2) > article:nth-child(1)');
		this.mainServiceValue = page.locator('div.info-row:nth-child(2) > div:nth-child(2) > span:nth-child(1)');
		this.filmsField = page.locator('');
		this.filmsValue = page.locator('');
		this.dedicatedIPField = page.locator('');
		this.dedicatedIPValue = page.locator('');
		this.accruedBonusesField = page.locator('');
		this.accruedBonusesValue = page.locator('');
		this.refundField = page.locator('');
		this.refundValue = page.locator('');
		this.totalBalanceAmountField = page.locator('');
		this.totalBalanceAmountValue = page.locator('');
		this.bonusRefundField = page.locator('');
		this.bonusRefundValue = page.locator('');
		this.totalBonusesField = page.locator('');
		this.totalBonusesValue = page.locator('');
		this.cashWithdrawalField = page.locator('.info-row__refund > article');
		this.cashWithdrawalValue = page.locator('div.info-row:nth-child(4) > div:nth-child(2) span');
		this.payAmountField = page.locator('');
		this.payAmountValue = page.locator('');
		this.checkoutField = page.locator('div.info-row:nth-child(5) > article');
		this.checkoutValue = page.locator('div.info-row:nth-child(5) > div');
	}

	async navigateToPaymentPage(): Promise<void> {
		await this.page.goto(this.pageUrl);
	}
}

export { PaymentPage };
