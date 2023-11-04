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
			const adjAmount = plan.rabt_amount % 1 ? 0.5 : 1;
			let from = Math.max(mainDay.from - plan.rabt_amount, plan.from),
				to = Math.min(mainDay.from - 1, from + plan.rabt_amount - 1);
			// to =
			//     from +
			//     (plan.rabt_amount -
			//         1 * !((plan.amount + mainDay.from) % 1)) *
			//         (-1) ** plan.order_reversed;
			var rabtDay = { date: mainDay.date, from, to };
			console.log("rabtDay:", rabtDay);
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
	console.log(JSON.stringify({ days, rabtPlan }, null, 2));
	return days;
};
