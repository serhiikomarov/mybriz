import { expect } from "@playwright/test";
import { getAuthToken } from "../../auth/authenticate/authUtils";

export async function updatePassword(request: any, userID: string, newPassword: string) {
  const apiUrl = `https://dev-bil-api.briz.ua/buser/${userID}/password/update`;
  console.log(apiUrl);
  const token = await getAuthToken(request);
  console.log(token);
  const response = await request.put(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: { Password: `${newPassword}` },
  });

  const responseBody = await response.json();
  expect(responseBody, "Пользователь не создан").toBeDefined();
  return responseBody.data;
}
