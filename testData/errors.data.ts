const errorMessages = {
  ua: {
    fieldRequired: `Це обов'язкове поле`,
    loginIsShort: "Кількість символів - 3",
    contractIDIsShort: "Кількість символів - 4",
    invalidValue: "Невірне значення",
    passwordIsShort: "Кількість символів - 6",
    passwordIsLong: "Кількість символів не більше ніж - 16",
    undefinedUser: "Користувача з таким логіном і паролем не знайдено.",
    incorrectAccountNumberCode: "№ договору або Код з SMS некоректний. Перевірте і спробуйте знову.",
    informingBySMSIsNotActive: "Послуга SMS-інформування не активна для даного договору.",
    invalidConfirmationCode: "Введено неправильний код підтвердження.",
    invalidPhoneNumber: "Поле має бути коректним телефоном чи номером договору.",
  },
  en: {
    fieldRequired: "This field is required",
    loginIsShort: "Number of characters at least - 3",
    contractIDIsShort: "Number of characters at least - 4",
    invalidValue: "Invalid value",
    passwordIsShort: "Number of characters at least - 6",
    passwordIsLong: "The number of characters must be no more than - 16",
    undefinedUser: "User with this login and password not found.",
    incorrectAccountNumberCode: "Invalid Contract number or SMS-code. Check and try again.",
    informingBySMSIsNotActive: "The SMS-informing service is not active for this agreement.",
    invalidConfirmationCode: "Invalid confirmation code.",
    invalidPhoneNumber: "The attribute must be a valid phone number or contract number.",
  },
};

export { errorMessages };
