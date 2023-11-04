const { getDefInDays, DAY_MILL_SEC } = require("./getDefInDays");
// array with increment amount for each week day
module.exports = (date, dayI) => {
	date = new Date(+date);
	let decreaseBy = 0;
	if (date.getDay() + 1 !== dayI) {
		const defInDay = getDefInDays(dayI, date.getDay() + 1);
		decreaseBy = defInDay * DAY_MILL_SEC;
	}
	return new Date(+date + decreaseBy).getTime();
};
