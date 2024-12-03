import { previousMonday, isMonday, formatISO } from "date-fns";

export const weekdays = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

export function getWeekday(day) {
	if (day) {
		let dayIndex = new Date(day).getDay();
		dayIndex === 0 && (dayIndex += 7);
		return weekdays[dayIndex - 1];
	} else {
		return null;
	}
}

export function formatDate(date) {
	return formatISO(new Date(date), { representation: "date" });
}

export function getPreviousMondayString(date) {
	const dateObject = new Date(date || Date.now());
	if (!isMonday(dateObject)) {
		return formatDate(previousMonday(dateObject));
	}
	return formatDate(dateObject);
}
