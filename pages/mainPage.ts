import { Page, Locator } from "@playwright/test";

class MainPage {
  private readonly page: Page;
  public readonly pageUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.pageUrl = "https://devcabinet.briz.ua/";
  }

  async navigateToMainPage(): Promise<void> {
    await this.page.goto(this.pageUrl);
  }
}

export default MainPage;
