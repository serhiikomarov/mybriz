import { expect } from '@playwright/test';
import { bUserCreateObj } from './bUserCreate.data';
import { getAuthToken } from '../../auth/authenticate/authUtils';

// Функция создания пользователя в биллинге
export async function createBUser(request) {
  const apiUrl = 'https://dev-bil-api.briz.ua/buser';

  const token = await getAuthToken(request);
  console.log(token);
  // Отправляем POST-запрос с email и паролем
  const response = await request.post(apiUrl, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: bUserCreateObj,
  });

  const responseBody = await response.json();
  expect(responseBody, "Пользователь не создан").toBeDefined()
  return responseBody.data;
}


