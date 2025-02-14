import { test, expect } from "@playwright/test";
import { getAuthToken } from "./authUtils";

test("Checking the function of authorization token in billing", async ({ request }) => {
  const token = await getAuthToken(request);
  expect(token, "ERROR: Token not received").toBeDefined();
  console.log(`Token has been received: ${token}`);
});
