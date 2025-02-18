import { getAuthToken } from "../../auth/authenticate/authUtils";

export async function addMoney(request: any, userID: string, data: any) {
  const apiUrl = `https://dev-bil-api.briz.ua/buser/${userID}/money/direct`;
  const token = await getAuthToken(request);
  const response = await request.post(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    /* 
    Data examples: 
    {"amount": 100} - 100 UAH will be credited to the balance.
    {"bonus": 100} - 100 bonuses will be credited to the balance.
    */
    data: data,
  });
}
