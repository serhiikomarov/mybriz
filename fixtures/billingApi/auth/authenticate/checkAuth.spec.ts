import { test, expect } from "@playwright/test";
import { getAuthToken } from "./authUtils";

test("Checking the function of authorization token in billing", async ({ request }) => {
  try {
    const token = await getAuthToken(request);
    expect(token).toBeDefined();
    console.log(`Token has been received: ${token}`);
  } catch (error) {
    console.log("--- ERROR: Token not received. ---");
  }
});
