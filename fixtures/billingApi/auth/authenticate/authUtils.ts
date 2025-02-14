import { expect } from "@playwright/test";
import { billingUserCredentials } from "./authUtils.data";

export async function getAuthToken(request: any) {
  const apiUrl = "https://dev-bil-api.briz.ua/api/authenticate";
  const response = await request.post(apiUrl, {
    data: billingUserCredentials,
  });

  const responseBody = await response.json();
  const billingAuthToken = responseBody.data.token;
  expect(billingAuthToken, "ERROR: Token not received.").toBeDefined();
  return billingAuthToken;
}
