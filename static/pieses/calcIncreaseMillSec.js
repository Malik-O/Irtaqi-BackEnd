const { getDefInDays, DAY_MILL_SEC } = require("./getDefInDays");
// array with increment amount for each week day
module.exports = (working_days) => {
	let increaseMillSec = [];
	// calculate decrease in MillSec
	working_days.forEach((day, i) => {
		increaseMillSec.push(getDefInDays(day, working_days.at(i - 1)));
	});
	increaseMillSec = increaseMillSec.map((d) => d * DAY_MILL_SEC);
	return increaseMillSec;
};
