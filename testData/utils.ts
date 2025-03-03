import { daysInMonth, remainingDaysInMonth } from '../fixtures';

function toPayAmountFunc(months: number, servicePrice: any) {
	if (months === 1) return (servicePrice / daysInMonth()) * remainingDaysInMonth();
	return servicePrice * months;
}

export { toPayAmountFunc };
