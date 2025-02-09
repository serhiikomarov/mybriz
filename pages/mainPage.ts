import { Page, Locator } from '@playwright/test';

class MainPage {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToLoginPage(): Promise<void> {
        await this.page.goto('https://devcabinet.briz.ua');
    }
}

export default MainPage;