const {
	GraphQLID,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLSchema,
	GraphQLBoolean,
} = require("graphql");
const { PubSub } = require("graphql-subscriptions");
//* types
// ...
const User_type = require("./types/Users/User");
const Notifications_type = require("./types/Notifications");
//* DB schema
// ...
//* Queries
const userQuery = require("./queries/user");
const notificationsQuery = require("./queries/notifications");
const groupsQuery = require("./queries/groups");
const groupAttendance = require("./queries/groupAttendance");
const plansQuery = require("./queries/plans/plans");
const PlanInstanceHistoryAtDateQuery = require("./queries/plans/PlanInstanceHistoryAtDate");
//* mutations
const // Users
	createUser = require("./mutations/Users/createUser"),
	updateUser = require("./mutations/Users/updateUser"),
	removeUser = require("./mutations/Users/removeUser");
const // attendance
	updateAttendance = require("./mutations/attendance/updateAttendance");
const // Plans
	addPlan = require("./mutations/Plans/addPlan"),
	editInstance = require("./mutations/Plans/editInstance"),
	spreadPlan = require("./mutations/Plans/spreadPlan"),
	updateHistory = require("./mutations/Plans/updateHistory");
const // Notifications
	pushNotification = require("./mutations/notifications/pushNotification"),
	removeNotifications = require("./mutations/notifications/removeNotifications"),
	seenAllNotifications = require("./mutations/notifications/seenAllNotifications");
//
const NEW_USER = "NEW_USER";
const NewNotification = "NewNotification";
const pubsub = new PubSub();
//? Query
const query = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		user: userQuery,
		notifications: notificationsQuery,
		groups: groupsQuery,
		plans: plansQuery,
		PlanInstanceHistoryAtDate: PlanInstanceHistoryAtDateQuery,
		groupAttendance: groupAttendance,
	},
});
//? Mutations
const mutation = new GraphQLObjectType({
	name: "mutation",
	fields: {
		// users
		createUser,
		updateUser,
		removeUser,
		// attendance
		updateAttendance,
		// plans
		addPlan,
		editInstance,
		spreadPlan,
		updateHistory,
		// Notifications
		pushNotification,
		removeNotifications,
		seenAllNotifications,
	},
});

const subscription = new GraphQLObjectType({
	name: "subscription",
	fields: {
		newUserSubscription: {
			type: User_type,
			subscribe(_, args) {
				return pubsub.asyncIterator(NEW_USER);
			},
		},
		newNotificationSubscription: {
			type: Notifications_type,
			subscribe(_, args) {
				return pubsub.asyncIterator(NewNotification);
			},
		},
	},
});
// exports
module.exports = new GraphQLSchema({ query, mutation, subscription });
