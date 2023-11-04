const generatePlanDays = require("../generatePlanDays");
describe("simple", () => {
	test("simple req for one week of three days", () => {
		const props = {
			from: 1,
			amount: 1,
			weeks: 1,
			entity_id: "6514396c1ffb2f1f855acff8",
			order_reversed: false,
			title: "new",
			working_days: [1, 2, 3],
			entity_type: "student",
			starting_at: 1696762871948,
		};
		expect(generatePlanDays(props)).toMatchObject([
			{
				days: [
					{
						date: new Date("2023-10-09T11:01:11.948Z"),
						from: "1:1",
						to: "1:7",
					},
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "2:1",
						to: "2:5",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "2:6",
						to: "2:16",
					},
				],
				...props,
			},
		]);
	});
	test("reversed from الانفال", () => {
		const props = {
			from: 177,
			amount: 10,
			weeks: 1,
			entity_id: "6514396c1ffb2f1f855acff8",
			order_reversed: true,
			title: "new",
			working_days: [1, 2, 3, 4],
			entity_type: "student",
			starting_at: 1696762871948,
		};
		expect(generatePlanDays(props)).toMatchObject([
			{
				...props,
				days: [
					{
						date: new Date("2023-10-09T11:01:11.948Z"),
						from: "8:1",
						to: "8:75",
					},
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "7:1",
						to: "7:81",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "7:82",
						to: "7:159",
					},
					{
						date: new Date("2023-10-12T11:01:11.948Z"),
						from: "7:160",
						to: "6:35",
					},
				],
			},
		]);
	});
	test("reversed from الناس", () => {
		const props = {
			from: 604,
			amount: 2,
			weeks: 1,
			entity_id: "6514396c1ffb2f1f855acff8",
			order_reversed: true,
			title: "new",
			working_days: [1, 2, 3, 4],
			entity_type: "student",
			starting_at: 1696762871948,
		};
		expect(generatePlanDays(props)).toMatchObject([
			{
				...props,
				days: [
					{
						date: new Date("2023-10-09T11:01:11.948Z"),
						from: "114:1",
						to: "109:6",
					},
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "108:1",
						to: "103:3",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "102:1",
						to: "99:8",
					},
					{
						date: new Date("2023-10-12T11:01:11.948Z"),
						from: "98:1",
						to: "95:8",
					},
				],
			},
		]);
	});
	test("manage invalid page input", () => {
		const props = {
			from: 1,
			amount: 2,
			weeks: 1,
			entity_id: "6514396c1ffb2f1f855acff8",
			order_reversed: true,
			title: "new",
			working_days: [1, 2, 3, 4],
			entity_type: "student",
			starting_at: 1696762871948,
		};
		expect(generatePlanDays(props)).toMatchObject([
			{
				...props,
				days: [],
			},
		]);
	});
});
describe("with rabt", () => {
	test("forward with rabt", () => {
		const props = {
			from: 1,
			rabt_amount: 1,
			amount: 1,
			weeks: 1,
			entity_id: "6514396c1ffb2f1f855acff8",
			order_reversed: false,
			title: "new",
			working_days: [1, 2, 3],
			entity_type: "student",
			starting_at: 1696762871948,
		};
		expect(generatePlanDays(props)).toMatchObject([
			{
				...props,
				days: [
					{
						date: new Date("2023-10-09T11:01:11.948Z"),
						from: "1:1",
						to: "1:7",
					},
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "2:1",
						to: "2:5",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "2:6",
						to: "2:16",
					},
				],
			},
			{
				...props,
				days: [
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "1:1",
						to: "1:7",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "2:1",
						to: "2:5",
					},
				],
				title: "rabt of new",
			},
		]);
	});
	test("forward with rabt at the end (testing edge collapse)", () => {
		const props = {
			from: 603,
			rabt_amount: 1,
			amount: 1,
			weeks: 1,
			entity_id: "6514396c1ffb2f1f855acff8",
			order_reversed: false,
			title: "new",
			working_days: [1, 2, 3],
			entity_type: "student",
			starting_at: 1696762871948,
		};
		expect(generatePlanDays(props)).toMatchObject([
			{
				...props,
				days: [
					{
						date: new Date("2023-10-09T11:01:11.948Z"),
						from: "109:1",
						to: "111:5",
					},
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "112:1",
						to: "114:6",
					},
				],
			},
			{
				...props,
				days: [
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "109:1",
						to: "111:5",
					},
				],
				title: "rabt of new",
			},
		]);
	});
	test("forward with rabt from الفاتحة جزء", () => {
		const props = {
			from: 2,
			rabt_amount: 40,
			amount: 20,
			weeks: 1,
			entity_id: "6514396c1ffb2f1f855acff8",
			order_reversed: false,
			title: "new",
			working_days: [1, 2, 3],
			entity_type: "student",
			starting_at: 1696762871948,
		};
		expect(generatePlanDays(props)).toMatchObject([
			{
				...props,
				days: [
					{
						date: new Date("2023-10-09T11:01:11.948Z"),
						from: "2:1",
						to: "2:141",
					},
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "2:142",
						to: "2:252",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "2:253",
						to: "3:91",
					},
				],
			},
			{
				...props,
				days: [
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "2:1",
						to: "2:141",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "2:1",
						to: "2:252",
					},
				],
				title: "rabt of new",
			},
		]);
	});
	test("reverse with rabt in two weeks", () => {
		const props = {
			from: 604,
			rabt_amount: 2,
			amount: 1,
			weeks: 2,
			entity_id: "6514396c1ffb2f1f855acff8",
			order_reversed: true,
			title: "new",
			working_days: [1, 2, 3],
			entity_type: "student",
			starting_at: 1696762871948,
		};
		expect(generatePlanDays(props)).toMatchObject([
			{
				...props,
				days: [
					{
						date: new Date("2023-10-09T11:01:11.948Z"),
						from: "114:1",
						to: "112:4",
					},
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "111:1",
						to: "109:6",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "108:1",
						to: "106:4",
					},
					// next week
					{
						date: new Date("2023-10-16T11:01:11.948Z"),
						from: "105:1",
						to: "103:3",
					},
					{
						date: new Date("2023-10-17T11:01:11.948Z"),
						from: "102:1",
						to: "101:11",
					},
					{
						date: new Date("2023-10-18T11:01:11.948Z"),
						from: "100:1",
						to: "99:8",
					},
				],
			},
			{
				...props,
				days: [
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "114:1",
						to: "112:4",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "114:1",
						to: "109:6",
					},
					//
					{
						date: new Date("2023-10-16T11:01:11.948Z"),
						from: "111:1",
						to: "106:4",
					},
					{
						date: new Date("2023-10-17T11:01:11.948Z"),
						from: "108:1",
						to: "103:3",
					},
					{
						date: new Date("2023-10-18T11:01:11.948Z"),
						from: "105:1",
						to: "101:11",
					},
				],
				title: "rabt of new",
			},
		]);
	});
});
describe("fraction", () => {
	test("0.5 each day", () => {
		const props = {
			from: 3,
			amount: 0.5,
			weeks: 1,
			entity_id: "6514396c1ffb2f1f855acff8",
			order_reversed: false,
			title: "00000000",
			working_days: [1, 2, 3],
			entity_type: "student",
			starting_at: 1696762871948,
		};
		expect(generatePlanDays(props)).toMatchObject([
			{
				...props,
				days: [
					{
						date: new Date("2023-10-09T11:01:11.948Z"),
						from: "2:6",
						to: "2:11",
					},
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "2:12",
						to: "2:16",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "2:17",
						to: "2:20",
					},
				],
			},
		]);
	});
	test("0.5 each day with rabt 1 page", () => {
		const props = {
			from: 3,
			amount: 0.5,
			rabt_amount: 1,
			weeks: 1,
			entity_id: "6514396c1ffb2f1f855acff8",
			order_reversed: false,
			title: "fraction shit",
			working_days: [1, 2, 3],
			entity_type: "student",
			starting_at: 1696762871948,
		};
		expect(generatePlanDays(props)).toMatchObject([
			{
				...props,
				days: [
					{
						date: new Date("2023-10-09T11:01:11.948Z"),
						from: "2:6",
						to: "2:11",
					},
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "2:12",
						to: "2:16",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "2:17",
						to: "2:20",
					},
				],
			},
			{
				...props,
				title: "rabt of fraction shit",
				days: [
					{
						date: new Date("2023-10-10T11:01:11.948Z"),
						from: "2:6",
						to: "2:11",
					},
					{
						date: new Date("2023-10-11T11:01:11.948Z"),
						from: "2:6",
						to: "2:16",
					},
				],
			},
		]);
	});
});
/**
 * 
	// time, [jozo, hezb, robo, || *page*, surah, ayah]
	{
		title: "new",

		from: "1:1",
		amount: 1,
		order_reversed: false,

		weeks: 1,
		working_days: [1, 2, 3],
		starting_at: 1696762871948,

		rabt_amount: 0,

		entity_type: "student",
		entity_id: "6514396c1ffb2f1f855acff8",

		color: 'red',
		note: ""
	};
	// amount, page
	{
		title: "new",

		from: "54:1",
		amount: 30, // I want to finish 30 pages
		order_reversed: false,

		// weeks: 1,
		working_days: [1, 2, 3],
		starting_at: 1696762871948,

		rabt_amount: 1,

		entity_type: "student",
		entity_id: "6514396c1ffb2f1f855acff8",

		color: 'red',
		note: ""
	};
*/
