import { Page, Locator } from "@playwright/test";

class LoginPage {
  public page: Page;
  public pageUrl: string;
  public usernameInput: Locator;
  public passwordInput: Locator;
  public loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageUrl = "https://devcabinet.briz.ua/login";
    this.usernameInput = page.locator('[type="text"]');
    this.passwordInput = page.locator('[type="password"]');
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
