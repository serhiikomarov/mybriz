import { globalData } from "../../../global.data";
const currentDate = new Date();

export const bUserCreateObj = {
  AreaID: 0, // Район 0 - "Бриз"
  Name: "Тестовый аккаунт", // Имя пользователя
  StreetID: 9, // Улица 9 - Семена Палия
  Dom: "108", // Номер дома
  Flat: "555", // Номер квартиры
  DocType: "residence_permit", // Тип документа ВНЖ
  Passport: "888888888", // Номер документа
  Password: globalData.defaultPassword, // Пароль пользователя
  LocationType: "1",
  Type: "1",
  Comment: `Created by Playwright autotest ${currentDate}`,
};
