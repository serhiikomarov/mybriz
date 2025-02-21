import { Page, Locator } from "@playwright/test";

class PaymentPage {
  //  Names of the locators for the main elements on the page
  private readonly page: Page;
  public readonly pageTitle: Locator;
  public readonly serviceTitle: Locator;
  public readonly internetLogin: Locator;
  public readonly moviesCheckbox: Locator;
  public readonly staticIpCheckbox: Locator;
  public readonly currentPeriod: Locator;
  public readonly nextPeriod: Locator;
  public readonly monthSlider: Locator;

  // Names of the "Checkout Summary" component
  public readonly checkoutField: Locator;
  public readonly checkoutValue: Locator;
  public readonly paymentPeriod: Locator;
  public readonly useBonusesCheckbox: Locator;
  public readonly activateButton: Locator;
  public readonly mainServiceField: Locator;
  public readonly mainServiceValue: Locator;
  public readonly moviesField: Locator;
  public readonly moviesValue: Locator;
  public readonly staticIPField: Locator;
  public readonly staticIPValue: Locator;
  public readonly earnBonusField: Locator;
  public readonly earnBonusValue: Locator;
  public readonly backAmountField: Locator;
  public readonly backAmountValue: Locator;
  public readonly haveBalanceAmountField: Locator;
  public readonly haveBalanceAmountValue: Locator;
  public readonly backBonusAmountField: Locator;
  public readonly backBonusAmountValue: Locator;
  public readonly haveBonusAmountField: Locator;
  public readonly haveBonusAmountValue: Locator;
  public readonly canBalanceAmountField: Locator;
  public readonly canBalanceAmountValue: Locator;
  public readonly payAmountField: Locator;
  public readonly payAmountValue: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators of the main elements on the page
    this.pageTitle = page.locator('selector-for-page-title');
    this.serviceTitle = page.locator('selector-for-service-title');
    this.internetLogin = page.locator('selector-for-internet-login');
    this.moviesCheckbox = page.locator('selector-for-movies-checkbox');
    this.staticIpCheckbox = page.locator('selector-for-static-ip-checkbox');
    this.currentPeriod = page.locator('selector-for-current-period');
    this.nextPeriod = page.locator('selector-for-next-period');
    this.monthSlider = page.locator('selector-for-month-slider');

    // Locators of the "Checkout Summary" component
    this.checkoutField = page.locator('selector-for-total-amount-field');
    this.checkoutValue = page.locator('selector-for-total-amount-value');
    this.paymentPeriod = page.locator('selector-for-payment-period');
    this.useBonusesCheckbox = page.locator('selector-for-use-bonuses-checkbox');
    this.activateButton = page.locator('selector-for-activate-button');
    this.mainServiceField = page.locator('selector-for-main-service-field');
    this.mainServiceValue = page.locator('selector-for-main-service-value');
    this.moviesField = page.locator('selector-for-movies-field');
    this.moviesValue = page.locator('selector-for-movies-value');
    this.staticIPField = page.locator('selector-for-static-ip-field');
    this.staticIPValue = page.locator('selector-for-static-ip-value');
    this.earnBonusField = page.locator('selector-for-earn-bonus-field');
    this.earnBonusValue = page.locator('selector-for-earn-bonus-value');
    this.backAmountField = page.locator('selector-for-back-amount-field');
    this.backAmountValue = page.locator('selector-for-back-amount-value');
    this.haveBalanceAmountField = page.locator('selector-for-have-balance-amount-field');
    this.haveBalanceAmountValue = page.locator('selector-for-have-balance-amount-value');
    this.backBonusAmountField = page.locator('selector-for-back-bonus-amount-field');
    this.backBonusAmountValue = page.locator('selector-for-back-bonus-amount-value');
    this.haveBonusAmountField = page.locator('selector-for-have-bonus-amount-field');
    this.haveBonusAmountValue = page.locator('selector-for-have-bonus-amount-value');
    this.canBalanceAmountField = page.locator('selector-for-can-balance-amount-field');
    this.canBalanceAmountValue = page.locator('selector-for-can-balance-amount-value');
    this.payAmountField = page.locator('selector-for-pay-amount-field');
    this.payAmountValue = page.locator('selector-for-pay-amount-value');
  }

  async navigateToPaymentPage(url: string): Promise<void> {
    await this.page.goto(url);
  }
}

export default PaymentPage;
