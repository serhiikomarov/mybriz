import { generateUsername } from "../../../helpers";

const defaultInternetAccountObj = {
  Login: generateUsername(),
  ServiceID: 262,
  Password: "123123",
  Type: 9,
  Status: -3,
};

export { defaultInternetAccountObj };
