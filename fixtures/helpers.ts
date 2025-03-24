import { Page } from 'playwright';

function generateRandomEmail(): string {
	const length = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let email = '';

	for (let i = 0; i < length; i++) {
		email += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return email + '@breezein.test';
}

function daysInMonth() {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	return daysInMonth;
}

function remainingDaysInMonth(): number {
	const now = new Date();
	const currentDay = now.getDate();
	const year = now.getFullYear();
	const month = now.getMonth();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	return daysInMonth - currentDay + 1;
}

function periodToPay(timestamp: any) {
	const dateFromTimestamp = new Date(timestamp * 1000);
	let month = dateFromTimestamp.getMonth();
	const year = dateFromTimestamp.getFullYear();
	if (month === 0) return `січня ${year}`;
	else if (month === 1) return `лютого ${year}`;
	else if (month === 2) return `березня ${year}`;
	else if (month === 3) return `квітня ${year}`;
	else if (month === 4) return `травня ${year}`;
	else if (month === 5) return `червня ${year}`;
	else if (month === 6) return `липня ${year}`;
	else if (month === 7) return `серпня ${year}`;
	else if (month === 8) return `вересня ${year}`;
	else if (month === 9) return `жовтня ${year}`;
	else if (month === 10) return `листопада ${year}`;
	else if (month === 11) return `грудня ${year}`;
	else return 'Error generating the date';
}

function formatCurrency(value: number) {
	return value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.');
}

function generatePhoneNumber() {
	const fakePhone = Math.floor(Math.random() * (9999999 - 1111111 + 1) + 1111111);
	return `011${fakePhone}`;
}

function toPayAmountFunc(months: number, servicePrice: any) {
	if (months === 1) return (servicePrice / daysInMonth()) * remainingDaysInMonth();
	return servicePrice * months;
}

function generateLogin(length: number): string {
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let login = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		login += characters[randomIndex];
	}

	return login;
}

async function changeLanguage(page: Page, language: string) {
	await page.click('.dropdown-select__select-block');
	await page.click(`div.dropdown-select__select-options__item__btn:text("${language}")`);
}

function getPhoneMask(phoneNumber: string) {
	const array = [...phoneNumber];
	const phoneMask = `+380.....${array[6]}${array[7]}${array[8]}${array[9]}`;
	return phoneMask;
}

export { generateRandomEmail, daysInMonth, remainingDaysInMonth, periodToPay, formatCurrency, generatePhoneNumber, toPayAmountFunc, generateLogin, changeLanguage, getPhoneMask };
