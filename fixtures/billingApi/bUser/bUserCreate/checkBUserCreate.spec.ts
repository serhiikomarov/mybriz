import { test, expect } from "@playwright/test";
import { createBUser } from "./bUserCreateUtils";

test("Checking user creation function in billing", async ({ request }) => {
  const responseBody = await createBUser(request);
  expect(responseBody, "ERROR: User not created").toHaveProperty("data", expect.any(Number));
  console.log(`User ${responseBody.data} has been created.`);
});
