const validCheck = (pageNum) => pageNum < 605 && pageNum > 0;
const isInstanceValid = (instance) =>
	validCheck(instance.from) && validCheck(instance.to);
// fill plan days array
module.exports = ({
	totalDays,
	increaseMillSec,
	starting_at,
	pagePointer,
	plan,
	rabtPlan,
}) => {
	let days = [];
	for (let i = 0; i < totalDays; i++) {
		// add main range and date
		let mainDay = {
			date:
				starting_at +
				increaseMillSec[i % increaseMillSec.length] * +!!i,
			from: pagePointer,
			to:
				pagePointer +
				(plan.amount - 1 * !((plan.amount + pagePointer) % 1)),
		};
		// if invalid page num then break
		if (!isInstanceValid(mainDay)) break;
		// add rabt
		if (rabtPlan && i) {
			const from = Math.max(mainDay.from - plan.rabt_amount, plan.from);
			// calc rabt to (if the amount or the main day fom is a fraction then adjust with 1)
			const adjAmount = +!(plan.amount % 1 && mainDay.from % 1);
			const to =
				Math.min(mainDay.from, from + plan.rabt_amount) - adjAmount;
			const rabtDay = { date: mainDay.date, from, to };
			// push to days
			rabtPlan.days.push(rabtDay);
			// }
		}
		// close
		starting_at = mainDay.date;
		pagePointer = mainDay.to + !(mainDay.to % 1);
		// * (-1) ** plan.order_reversed;
		// push to days
		days.push(mainDay);
	}
	// console.log(JSON.stringify({ days, rabtPlan }, null, 2));
	return days;
};
