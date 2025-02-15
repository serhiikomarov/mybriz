import { expect } from "@playwright/test";
import { getAuthToken } from "../../auth/authenticate/authUtils";

export async function confirmEmail(request: any, code: string) {
  const apiUrl = "https://dev-bil-api.briz.ua/buser/auth/confirm";
  const token = await getAuthToken(request);
  const response = await request.post(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      code: code,
    },
  });

  const responseBody = await response.json();
  expect(responseBody.data, "ERROR: Email confirmation code not received").toBe(true);
  return responseBody;
}
