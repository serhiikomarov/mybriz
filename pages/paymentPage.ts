import { Page, Locator } from "@playwright/test";

class PaymentPage {
  private readonly page: Page;
  public readonly pageTitle: Locator;
  public readonly serviceTitle: Locator;
  public readonly internetLogin: Locator;
  public readonly moviesCheckbox: Locator;
  public readonly staticIpCheckbox: Locator;
  public readonly currentPeriod: Locator;
  public readonly nextPeriod: Locator;
  public readonly monthSlider: Locator;
  public readonly useBonusesCheckbox: Locator;
  public readonly activateButton: Locator;
  public readonly totalAmount: Locator;
  public readonly bonusDeduction: Locator;
  public readonly finalAmount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('');
    this.serviceTitle = page.locator('');
    this.internetLogin = page.locator('');
    this.moviesCheckbox = page.locator('text=Фільми').locator('input[type="checkbox"]');
    this.staticIpCheckbox = page.locator('text=Статична IP-адреса').locator('input[type="checkbox"]');
    this.currentPeriod = page.locator('button:has-text("лютого 2025")');
    this.nextPeriod = page.locator('button:has-text("серпня 2025")');
    this.monthSlider = page.locator('input[type="range"]');
    this.useBonusesCheckbox = page.locator('text=Використати бонуси').locator('input[type="checkbox"]');
    this.activateButton = page.locator('button:has-text("Активувати")');
    this.totalAmount = page.locator('text=До сплати').nth(0);
    this.bonusDeduction = page.locator('text=Зняття бонусів');
    this.finalAmount = page.locator('text=До сплати').nth(1);
  }

  async navigateToPaymentPage(url: string): Promise<void> {
    await this.page.goto(url);
  }
}

export default PaymentPage;
