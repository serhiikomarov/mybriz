import { test, expect } from "@playwright/test";
import { createBUser } from "./bUserCreateUtils";

test("Проверка функции создания пользователя в биллинге", async ({
  request,
}) => {
  const responseBody = await createBUser(request);
  try {
    expect(responseBody).toBeGreaterThan(0);
    console.log(`Пользователь ${responseBody} создан.`);
  } catch (error) {
    console.log("--- ОШИБКА: Пользователь не создан! ---");
  }
});
