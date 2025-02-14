import { expect } from "@playwright/test";
import { getAuthToken } from "../../auth/authenticate/authUtils";

export async function emailConfirmationCode(request: any, email: string) {
  const apiUrl = `https://dev-bil-api.briz.ua/email/lastcode`;
  const token = await getAuthToken(request);
  console.log(token);
  const response = await request.post(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      email: email,
    },
  });

  const responseBody = await response.json();
  expect(responseBody.data, "ERROR: Email confirmation code not received").toBeUndefined();
  const emailConfirmationCode = responseBody.data;
  return emailConfirmationCode;
}
