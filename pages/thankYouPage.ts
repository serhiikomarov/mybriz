import { Page, Locator } from "@playwright/test";

class ThankYouPage {
  private readonly page: Page;
  public readonly successActivatedURL: string;
  public readonly successURLPattern = "**/success/activated?orderCode=customer-*";
  public readonly toMainButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successActivatedURL = "https://devcabinet.briz.ua/success/activated";
    this.toMainButton = page.locator(
      "div:first-of-type>div>div:first-of-type>div>main>div>div>div:nth-of-type(2)>div:nth-of-type(2)>div>button>span"
    );
  }
}

export { ThankYouPage };
