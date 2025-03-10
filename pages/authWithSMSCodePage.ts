import { Page, Locator } from "@playwright/test";

class AuthWithSMSCodePage {
  private readonly page: Page;
  public readonly pageUrl: string;
  public readonly codeInputFirstDigit: Locator;
  public readonly backButton: Locator;
  public readonly logInButton: Locator;
  public readonly sendCodeAgainButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageUrl = "https://devcabinet.briz.ua/login/enter-sms-code";
    this.codeInputFirstDigit = page.locator(
      ".login-enter-code-sms-container__form__otp > div:nth-child(1) > input:nth-child(1)"
    );
    this.backButton = page.locator(".button__basic__secondary_bold");
    this.logInButton = page.locator("button.MuiButtonBase-root:nth-child(2)");
    this.sendCodeAgainButton = page.locator("button.button:nth-child(3)");
  }

  async login(code: string): Promise<void> {
    await this.codeInputFirstDigit.fill(code);
    await this.logInButton.click();
  }

  async navigateToAuthWithSMSCodePage(): Promise<void> {
    await this.page.goto(this.pageUrl);
  }
}

export { AuthWithSMSCodePage };
