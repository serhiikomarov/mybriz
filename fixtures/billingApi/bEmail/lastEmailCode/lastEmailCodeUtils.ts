import { expect } from "@playwright/test";
import { getAuthToken } from "../../auth/authenticate/authUtils";

export async function emailConfirmationCode(request: any, email: string) {
  const apiUrl = `https://dev-bil-api.briz.ua/email/lastcode`;
  const token = await getAuthToken(request);
  const response = await request.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      email: email,
    },
  });

  const responseBody = await response.json();
  expect(typeof responseBody.data, "ERROR: Email confirmation code not received").toBe("string");
  const emailConfirmationCode = responseBody.data;
  return emailConfirmationCode;
}
