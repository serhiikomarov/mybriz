import { Page, Locator } from "@playwright/test";

class TwoFactorPage {
  private readonly page: Page;
  public readonly pageUrl: string;
  public readonly backButton: Locator;
  public readonly maskedPhoneNumber: Locator;
  public readonly changePhoneNumberButton: Locator;
  public readonly sendCodeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageUrl = "https://devcabinet.briz.ua/login/two-factor-auth";
    this.backButton = page.locator("button.button__text__primary:nth-child(1)");
    this.maskedPhoneNumber = page.locator(".two-factor-auth__content-container__content__form__phone-container__phone");
    this.changePhoneNumberButton = page.locator("button.button__text__primary:nth-child(3) > span");
    this.sendCodeButton = page.locator("button.MuiButtonBase-root:nth-child(3)");
  }

  async navigateToTwoFactorPage(): Promise<void> {
    await this.page.goto(this.pageUrl);
  }
}

export { TwoFactorPage };
