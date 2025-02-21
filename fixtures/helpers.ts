export function generateRandomEmail(): string {
  const length = Math.floor(Math.random() * (20 - 10 + 1)) + 10; // случайная длина от 10 до 20
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let email = "";

  for (let i = 0; i < length; i++) {
    email += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return email + "@breezein.test";
}

function getFirstDayOfPreviousMonth() {
  const today = new Date();
  const firstDayPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); 
  return firstDayPrevMonth.toISOString().split('T')[0];
}