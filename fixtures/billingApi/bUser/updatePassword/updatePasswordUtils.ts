import { expect } from "@playwright/test";
import { getAuthToken } from "../../auth/authenticate/authUtils";

export async function passwordUpdate(request: any, newPassword: any) {
  const apiUrl = "https://dev-bil-api.briz.ua/buser";

  const token = await getAuthToken(request);
  console.log(token);
  const response = await request.post(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: requestData,
  });

  const responseBody = await response.json();
  expect(responseBody, "Пользователь не создан").toBeDefined();
  return responseBody.data;
}
