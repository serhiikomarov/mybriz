import { Page, Locator } from "@playwright/test";

class MainPage {
  public page: Page;
  public pageUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.pageUrl = "https://devcabinet.briz.ua/";
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(this.pageUrl);
  }
}

export default MainPage;
