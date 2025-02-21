import { Page, Locator } from "@playwright/test";

class PaymentPage {
  private readonly page: Page;

  //  Names of the locators for the main elements on the page
  public readonly pageTitle: Locator;
  public readonly serviceTitle: Locator;
  public readonly internetLogin: Locator;
  public readonly moviesCheckbox: Locator;
  public readonly staticIpCheckbox: Locator;
  public readonly currentPeriod: Locator;
  public readonly nextPeriod: Locator;
  public readonly monthSlider: Locator;

  // Names of the "Checkout Summary" component
  public readonly checkoutMainField: Locator;
  public readonly checkoutMainValue: Locator;
  public readonly paymentPeriod: Locator;
  public readonly useBonusesCheckbox: Locator;
  public readonly activateButton: Locator;
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

  constructor(page: Page) {
    this.page = page;

    // Locators of the main elements on the page
    this.pageTitle = page.locator('');
    this.serviceTitle = page.locator('');
    this.internetLogin = page.locator('');
    this.moviesCheckbox = page.locator('');
    this.staticIpCheckbox = page.locator('');
    this.currentPeriod = page.locator('');
    this.nextPeriod = page.locator('');
    this.monthSlider = page.locator('');

    // Locators of the "Checkout Summary" component
    this.checkoutMainField = page.locator('');
    this.checkoutMainValue = page.locator('');
    this.paymentPeriod = page.locator('');
    this.useBonusesCheckbox = page.locator('');
    this.activateButton = page.locator('');
    this.mainServiceField = page.locator('');
    this.mainServiceValue = page.locator('');
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
    this.cashWithdrawalField = page.locator('');
    this.cashWithdrawalValue = page.locator('');
    this.payAmountField = page.locator('');
    this.payAmountValue = page.locator('');
    this.checkoutField = page.locator('');
    this.checkoutValue = page.locator('');
  }

  async navigateToPaymentPage(url: string): Promise<void> {
    await this.page.goto(url);
  }
}

export default PaymentPage;
