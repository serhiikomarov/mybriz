import { expect } from "@playwright/test";
import { getAuthToken } from "../../auth/authenticate/authUtils";
import { generatePhoneNumber } from "../../../helpers";

async function addPhoneNumber(request: any, userID: number, phoneNumber: string) {
  const apiUrl = `https://dev-bil-api.briz.ua/buser/${userID}/sms/save`;
  const token = await getAuthToken(request);
  const response = await request.post(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      phone: `${phoneNumber}`,
    },
  });

  const responseBody = await response.json();
  expect(responseBody.data, "ERROR: Phone number not added").toBeGreaterThan(0);
  return responseBody;
}

export { addPhoneNumber };
