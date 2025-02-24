import { Page, Locator } from "@playwright/test";

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
  public readonly monthSlider: Locator;
  public readonly sliderPosition1: Locator;
  public readonly sliderPosition2: Locator;
  public readonly sliderPosition3: Locator;
  public readonly sliderPosition4: Locator;
  public readonly sliderPosition5: Locator;
  public readonly sliderPosition6: Locator;
  public readonly sliderPosition7: Locator;
  public readonly sliderPosition8: Locator;
  public readonly sliderPosition9: Locator;
  public readonly sliderPosition10: Locator;
  public readonly sliderPosition11: Locator;
  public readonly sliderPosition12: Locator;

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
    this.pageTitle = page.locator(".payment__title");
    this.serviceTitle = page.locator(".payment__content__options__service-changer__service-name__name__value");
    this.serviceAmount = page.locator(
      "html > body > div:first-of-type > div > div > div > main > div > div > div > div > div:first-of-type > div:first-of-type > div > div > p"
    );
    this.internetLogin = page.locator("article.payment__content__label:nth-child(3)");
    this.moviesCheckbox = page.locator("");
    this.staticIpCheckbox = page.locator("");
    this.currentPeriod = page.locator("");
    this.nextPeriod = page.locator("");
    this.monthSlider = page.locator("");
    this.sliderPosition1 = page.locator("span.MuiSlider-markLabel:nth-child(4)");
    this.sliderPosition2 = page.locator("span.MuiSlider-markLabel:nth-child(6)");
    this.sliderPosition3 = page.locator("span.MuiSlider-markLabel:nth-child(8)");
    this.sliderPosition4 = page.locator("span.MuiSlider-markLabel:nth-child(10)");
    this.sliderPosition5 = page.locator("span.MuiSlider-markLabel:nth-child(12)");
    this.sliderPosition6 = page.locator("span.MuiSlider-markLabel:nth-child(14)");
    this.sliderPosition7 = page.locator("span.MuiSlider-markLabel:nth-child(16)");
    this.sliderPosition8 = page.locator("span.MuiSlider-markLabel:nth-child(18)");
    this.sliderPosition9 = page.locator("span.MuiSlider-markLabel:nth-child(20)");
    this.sliderPosition10 = page.locator("span.MuiSlider-markLabel:nth-child(22)");
    this.sliderPosition11 = page.locator("span.MuiSlider-markLabel:nth-child(24)");
    this.sliderPosition12 = page.locator("span.MuiSlider-markLabel:nth-child(26)");

    // Locators of the "Checkout Summary" component
    this.checkoutMainField = page.locator("div:nth-of-type(2) > div > div:first-of-type > div > article");
    this.checkoutMainValue = page.locator("div:nth-of-type(2) > div > div:first-of-type > div > div > span");
    this.paymentPeriod = page.locator("");
    this.useBonusesCheckbox = page.locator("");
    this.activateButton = page.locator(".button__basic__primary");
    this.spoilerButton = page.locator(".btn-props");
    this.mainServiceField = page.locator("");
    this.mainServiceValue = page.locator("");
    this.filmsField = page.locator("");
    this.filmsValue = page.locator("");
    this.dedicatedIPField = page.locator("");
    this.dedicatedIPValue = page.locator("");
    this.accruedBonusesField = page.locator("");
    this.accruedBonusesValue = page.locator("");
    this.refundField = page.locator("");
    this.refundValue = page.locator("");
    this.totalBalanceAmountField = page.locator("");
    this.totalBalanceAmountValue = page.locator("");
    this.bonusRefundField = page.locator("");
    this.bonusRefundValue = page.locator("");
    this.totalBonusesField = page.locator("");
    this.totalBonusesValue = page.locator("");
    this.cashWithdrawalField = page.locator("");
    this.cashWithdrawalValue = page.locator("");
    this.payAmountField = page.locator("");
    this.payAmountValue = page.locator("");
    this.checkoutField = page.locator("");
    this.checkoutValue = page.locator("");
  }

  async navigateToPaymentPage(): Promise<void> {
    await this.page.goto(this.pageUrl);
  }
}

export default PaymentPage;
