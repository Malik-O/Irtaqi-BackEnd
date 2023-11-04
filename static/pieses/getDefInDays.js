// get deferent in days
module.exports = {
	getDefInDays: (d1, d2) => (d1 >= d2 ? d1 - d2 : 7 - d2 + d1),
	DAY_MILL_SEC: 24 * 60 * 60 * 1000,
};
