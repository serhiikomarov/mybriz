import { expect } from "@playwright/test";
import { getAuthToken } from "../../auth/authenticate/authUtils";
import { defaultInternetAccountObj } from "./createInternetAccount.data";

async function createInternetAccount(request: any, userID: number, data?: any) {
  const apiUrl = `https://dev-bil-api.briz.ua/buser/${userID}/internets`;
  const token = await getAuthToken(request);
  console.log(token);
  const response = await request.post(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data || defaultInternetAccountObj,
  });

  const responseBody = await response.json();
  expect(responseBody, "ERROR: Internet account not added").toBeDefined();
  return responseBody;
}

async function getInternetAccountID(request: any, userID: number) {
  const responseBody = await createInternetAccount(request, userID);
  const accountID = responseBody.data;
  return accountID;
}

export { createInternetAccount, getInternetAccountID };
