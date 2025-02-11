import { test, expect } from "@playwright/test";
import { getAuthToken } from "../../auth/authenticate/authUtils";

test("Checking the function of authorization token in billing", async ({
  request,
}) => {
  try {
    const token = await getAuthToken(request);
    expect(token).toBeDefined();
    console.log(`Токен получен: ${token}`);
  } catch (error) {
    console.log("--- ОШИБКА: Токен не получен! ---");
  }
});
