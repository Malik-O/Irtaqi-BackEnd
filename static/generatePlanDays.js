const { pageToVerse } = require("./stringify");
const calcIncreaseMillSec = require("./pieses/calcIncreaseMillSec");
const getDayInWeek = require("./pieses/getDayInWeek");
const fillDaysArray = require("./pieses/fillDaysArray");
const versesPerPage = require("./data/versesPerPage.json");
const reversedPages = require("./data/reversedPages.json");
// the function
module.exports = (plan) => {
	const { pages } = plan.order_reversed ? reversedPages : versesPerPage;
	// if reversed get first page index
	if (plan.order_reversed)
		plan.from = pages.findIndex((page) => page.page_num === plan.from) + 1;
	plan.days = [];
	let { from: pagePointer, starting_at } = plan;
	// increase each day by one
	const working_days = [...plan.working_days].map((d) => ++d);
	// rabt
	let rabtPlan = plan.rabt_amount && {
		...plan,
		title: `rabt of ${plan.title}`,
		rabt_for_plan_id: plan.id,
		days: [],
	};
	// array with increment amount for each week day
	let increaseMillSec = calcIncreaseMillSec(working_days);
	// set pointer to first day in week
	starting_at = getDayInWeek(starting_at, working_days[0]);
	// total mainDays
	const totalDays = plan.weeks * plan.working_days.length;
	// fill plan days array
	plan.days = fillDaysArray({
		totalDays,
		increaseMillSec,
		starting_at,
		pagePointer,
		plan,
		rabtPlan,
	});
	// format date to Date Object
	plan.days.map((d) => (d.date = new Date(+d.date)));
	// rabt styling the object
	if (rabtPlan) {
		rabtPlan.days.map((d) => (d.date = new Date(+d.date)));
		delete rabtPlan.rabt_amount;
		// rabtPlan.rabt_for_plan_id = plan.id;
	}
	// page numbers to verse keys
	const allPlans = [plan];
	if (rabtPlan) allPlans.push(rabtPlan);
	allPlans.forEach((plan) => {
		plan.days = plan.days.map((day) => ({
			...day,
			...pageToVerse({
				...day,
				verseKeyObj: true,
				consValues: { versesPerPage, reversedPages },
				order_reversed: plan.order_reversed,
			}),
		}));
	});
	// style for DB
	delete plan.rabt_amount;
	// console.log("allPlans:", JSON.stringify(allPlans, null, 2));
	// return
	return allPlans;
};
