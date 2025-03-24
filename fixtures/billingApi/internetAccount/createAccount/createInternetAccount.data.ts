import { globalData } from '../../../../testData';

const defaultInternetAccountObj = (login: string) => {
	return {
		Login: login,
		ServiceID: 262,
		Password: globalData.defaultInternetPassword,
		Type: 9,
		Status: -3,
	};
};

export { defaultInternetAccountObj };
