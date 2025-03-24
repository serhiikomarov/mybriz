import { globalData } from '../../../../testData/global.data';
const currentDate = new Date();

const defaultUserCreateObj = {
	AreaID: 0,
	Name: 'Test_Playwright',
	StreetID: 9,
	Dom: '108',
	Flat: '555',
	DocType: 'residence_permit',
	Passport: '888888888',
	Password: globalData.defaultPassword,
	LocationType: '1',
	Type: '1',
	Comment: `Created by Playwright autotest ${currentDate}`,
};

export { defaultUserCreateObj };
