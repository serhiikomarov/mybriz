import { Page, Locator } from "@playwright/test";

class LoginPage {
  private readonly page: Page;
  public readonly pageUrl: string;
  public readonly usernameInput: Locator;
  public readonly usernameInputHelper: Locator;
  public readonly passwordInput: Locator;
  public readonly passwordInputHelper: Locator;
  public readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageUrl = "https://devcabinet.briz.ua/login";
    this.usernameInput = page.locator('[type="text"]');
    this.usernameInputHelper = page.locator("#mui-1-helper-text");
    this.passwordInput = page.locator('[type="password"]');
    this.passwordInputHelper = page.locator("#mui-2-helper-text");
    this.loginButton = page.locator('[type="submit"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(this.pageUrl);
  }
}

export default LoginPage;
