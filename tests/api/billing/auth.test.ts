import { test, expect } from '@playwright/test';
import { billingUserCredentials } from '../../../testData/billingData';



test('Billing get auth token', async ({ request }) => {
  // URL вашего API для авторизации
  const apiUrl = 'https://dev-bil-api.briz.ua/api/authenticate';

  // Отправляем POST-запрос с email и паролем
  const response = await request.post(apiUrl, {
    data: {
      email: billingUserCredentials.email,
      password: billingUserCredentials.password,
    },
  });

  const responseBody = await response.json();

  expect(responseBody.data, 'Ошибка получения токена').toHaveProperty('token'); 
  const billingAuthToken = responseBody.data.token;
});