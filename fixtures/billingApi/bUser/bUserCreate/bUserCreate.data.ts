import { globalData } from '../../../../testData/global.data';

const defaultUserCreateObj = {
	AreaID: 0,
	Name: 'Test_Playwright',
	StreetID: 9,
	Dom: '108',
	Flat: '555',
	DocType: 'residence_permit',
	Passport: '888888888',
	Password: globalData.defaultPassword,
	Phones: [
		{
			Number: '0930000000',
			ContactName: 'Dimon',
		},
	],
	LocationType: '1',
	Type: '1',
	Comment: `Created by Playwright autotest ${new Date()}`,
};

async function bUserConstructor(name: string, type: string, streetID: number, dom: string, flat: string) {
	return {
		AreaID: 0,
		Name: name,
		StreetID: streetID,
		Dom: dom,
		Flat: flat,
		DocType: 'residence_permit',
		Passport: '888888888',
		Password: globalData.defaultPassword,
		Phones: [
			{
				Number: '0930000000',
				ContactName: 'Dimon',
			},
		],
		LocationType: '1',
		Type: type, // 1 = Физ.лицо, 2 = Юр.лицо, 6 = Физо-юр.лицо
		Comment: `Created by Playwright autotest ${new Date()}`,
	};
}

export { defaultUserCreateObj, bUserConstructor };
