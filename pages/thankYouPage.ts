import { Page, Locator } from "@playwright/test";

class ThankYouPage {
  private readonly page: Page;
  public readonly successActivatedURL: string;
  public readonly successURLPattern = "**/success/activated?orderCode=customer-*";
  public readonly toMainButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successActivatedURL = "https://devcabinet.briz.ua/success/activated";
    this.toMainButton = page.locator(".button__text > span:nth-child(1)");
  }
}

export default ThankYouPage;
