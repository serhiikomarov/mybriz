import { test, expect } from '@playwright/test';
import LoginPage from '../pages/authPage';
import MainPage from '../pages/mainPage';

test.describe('Auth by contract ID and password', () => {

    let loginPage: LoginPage;
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        // Создаем объект для страницы логина
        loginPage = new LoginPage(page);
        mainPage = new MainPage(page);

        await loginPage.navigateToLoginPage();
    });

    test('authByContractId правильный номер договора и пароль', async () => {
        await loginPage.login('129999', '123456');       
    });
});
