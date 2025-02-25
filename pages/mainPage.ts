import { Page, Locator } from "@playwright/test";

class MainPage {
  private readonly page: Page;
  public readonly pageUrl: string;
  public readonly goToPaymentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageUrl = "https://devcabinet.briz.ua/";
    this.goToPaymentButton = page.locator(".MuiButtonBase-root");
  }

  async navigateToMainPage(): Promise<void> {
    await this.page.goto(this.pageUrl);
  }
}

export { MainPage };
