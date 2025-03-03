import { generateRandomEmail } from '../../helpers';

const defaultIPTVAccountObj = {
	ServiceID: 13,
	Email: generateRandomEmail(),
	OttPassword: '123456',
};

export { defaultIPTVAccountObj };
