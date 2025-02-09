import { test, expect } from '@playwright/test';

test.only('authByContractId правильный номер договора и пароль', async ({ page }) => {
  await page.goto('https://devcabinet.briz.ua/login');
  await page.locator('[type="text"]').fill(String(129999));
  await page.locator('[type="password"]').fill(String(123456));
  await page.locator('[type="submit"]').click();
});

// test('authByContractId валидный номер договора и пустой пароль UA', async ({ page }) => {
//   await page.goto(pages.authPage);
//   await page.locator(authPageLocator.login).fill(String(userAccount.defaultContractId));
//   await page.locator(authPageLocator.password).fill(commonData.emptyData);
//   await page.locator(authPageLocator.logInButton).click();
//   await expect(page.locator(authPageLocator.helperEmptyPassword)).toHaveText(errorText.ua.fieldRequired);
// });

// test('authByContractId пустой номер договора и валидный пароль UA', async ({ page }) => {
//   await page.goto(pages.authPage);
//   await page.locator(authPageLocator.login).fill(commonData.emptyData);
//   await page.locator(authPageLocator.password).fill(String(userPassword.defaultPassword));
//   await page.locator(authPageLocator.logInButton).click();
//   await expect(page.locator(authPageLocator.helperEmptyLogin)).toHaveText(errorText.ua.fieldRequired);
// });

// test('authByContractId пустой номер договора и пустой пароль UA', async ({ page }) => {
//   await page.goto(pages.authPage);
//   await page.locator(authPageLocator.login).fill(commonData.emptyData);
//   await page.locator(authPageLocator.password).fill(commonData.emptyData);
//   await page.locator(authPageLocator.logInButton).click();
//   await expect(page.locator(authPageLocator.helperEmptyLogin)).toHaveText(errorText.ua.fieldRequired);
//   await expect(page.locator(authPageLocator.helperEmptyLogin)).toHaveText(errorText.ua.fieldRequired);
// });

// test('authByContractId валидный номер договора и пустой пароль EN', async ({ page }) => {
//   await page.goto(pages.authPage);
//   await page.locator(headerLocators.languageDropdown).click();
//   await page.locator(headerLocators.languageEn).click();
//   await page.locator(authPageLocator.login).fill(String(userAccount.defaultContractId));
//   await page.locator(authPageLocator.password).fill(commonData.emptyData);
//   await page.locator(authPageLocator.logInButton).click();
//   await expect(page.locator(authPageLocator.helperEmptyPassword)).toHaveText(errorText.en.fieldRequired);
// });

// test('authByContractId пустой номер договора и валидный пароль EN', async ({ page }) => {
//   await page.goto(pages.authPage);
//   await page.locator(headerLocators.languageDropdown).click();
//   await page.locator(headerLocators.languageEn).click();
//   await page.locator(authPageLocator.login).fill(commonData.emptyData);
//   await page.locator(authPageLocator.password).fill(String(userPassword.defaultPassword));
//   await page.locator(authPageLocator.logInButton).click();
//   await expect(page.locator(authPageLocator.helperEmptyLogin)).toHaveText(errorText.en.fieldRequired);
// });

// test('authByContractId пустой номер договора и пустой пароль EN', async ({ page }) => {
//   await page.goto(pages.authPage);
//   await page.locator(headerLocators.languageDropdown).click();
//   await page.locator(headerLocators.languageEn).click();
//   await page.locator(authPageLocator.login).fill(commonData.emptyData);
//   await page.locator(authPageLocator.password).fill(commonData.emptyData);
//   await page.locator(authPageLocator.logInButton).click();
//   await expect(page.locator(authPageLocator.helperEmptyLogin)).toHaveText(errorText.en.fieldRequired);
//   await expect(page.locator(authPageLocator.helperEmptyLogin)).toHaveText(errorText.en.fieldRequired);
// });

// test('authByContractId валидный несуществующий номер договора и валидный пароль UA', async ({ page }) => {
//   await page.goto(pages.authPage);
//   await page.locator(authPageLocator.login).fill(String(userAccount.notExistContractId));
//   await page.locator(authPageLocator.password).fill(String(userPassword.defaultPassword));
//   await page.locator(authPageLocator.logInButton).click();
//   await expect(page.locator(authPageLocator.helperEmptyLogin)).toHaveText(errorText.ua.undefinedUser);
// });

// test('authByContractId валидный несуществующий номер договора и валидный пароль EN', async ({ page }) => {
//   await page.goto(pages.authPage);
//   await page.locator(headerLocators.languageDropdown).click();
//   await page.locator(headerLocators.languageEn).click();
//   await page.locator(authPageLocator.login).fill(String(userAccount.notExistContractId));
//   await page.locator(authPageLocator.password).fill(String(userPassword.defaultPassword));
//   await page.locator(authPageLocator.logInButton).click();
//   await expect(page.locator(authPageLocator.helperEmptyLogin)).toHaveText(errorText.en.undefinedUser);
// })
